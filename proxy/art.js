var EventProxy = require('eventproxy');

var models = require('../models');
var Topic = models.Blog;
var TopicTag = models.BlogTag;
var User = require('./user');
var Tag = require('./tag');
var Reply = require('./reply');
var Util = require('../lib/util');

var Showdown = require('showdown');
var converter = new Showdown.converter();
var md = require('node-markdown').Markdown;


/**
 * 获取所有信息的主题
 * Callback
 * - err , 数据库异常
 * - art , 文章
 * - tags , 标签
 * - author , 作者
 * - replies , 回复
 * @param {String} id || shortname 主题ID 或 短连接
 * @param {Function} callback 回调函数
 */
exports.getFullArt = function (id, shortname, callback) {
  var proxy = new EventProxy();
  var events = ['art', 'author', 'tags', 'replies'];
  proxy.assign(events, function (art, author, tags, replies) {
    callback(null, '', art, author, tags, replies);
  }).fail(callback);

  Art.findOne({_id: id}, proxy.done(function (art) {
    if (!topic) {
      proxy.unbind();
      return callback(null, '文章内容不存在.');
    }
    art.content = converter.makeHtml(art.content);
    art.create_at = Util.format_date(art.create_at, true);
    proxy.emit('art', art);
    User.getUserById(art.author_id, proxy.done(function (author){
      if (!author) {
        proxy.unbind();
        return callback(null, '文章作者丢失.');
      }
      proxy.emit('author', author);
    }));
    Reply.getRepliesByArtId(art._id,proxy.done('replies'));
    Tag.getTagsByArtId(art._id,proxy.done('tags'));
  }));
}

/**
 * 获取所有信息的主题
 * Callback:
 * - err, 数据库异常
 * - message, 消息
 * - topic, 主题
 * - tags, 主题的标签
 * - author, 主题作者
 * - replies, 主题的回复
 * @param {String} id 主题ID
 * @param {Function} callback 回调函数
 */
exports.getFullTopic = function (id, callback) {
  var proxy = new EventProxy();
  var events = ['topic', 'author', 'replies'];
  proxy.assign(events, function (topic, author, replies) {
    callback(null, '', topic, author, replies);
  }).fail(callback);

  Topic.findOne({_id: id}, proxy.done(function (topic) {
    if (!topic) {
      proxy.unbind();
      return callback(null, '此话题不存在或已被删除。');
    }
    topic.content = converter.makeHtml(topic.content);
    topic.friendly_create_at = Util.format_date(topic.create_at, true);
    proxy.emit('topic', topic); 
    //console.log(topic); 
    User.getUserById(topic.author_id, proxy.done(function (author) {
      if (!author) {
        proxy.unbind();
        return callback(null, '话题的作者丢了。');
      }
      proxy.emit('author', author);
    }));

    Reply.getRepliesByTopicId(topic._id, proxy.done('replies'));
  }));
};
/**
 * 根据主题ID获取主题
 * Callback:
 * - err, 数据库错误
 * - topic, 主题
 * - tags, 标签列表
 * - author, 作者
 * - lastReply, 最后回复
 * @param {String} id 主题ID
 * @param {Function} callback 回调函数
 */
 exports.getTopicById = function (id, callback) {
  var proxy = new EventProxy();
  var events = ['topic', 'author', 'last_reply'];
  proxy.assign(events, function (topic, author, last_reply) {
    return callback(null, topic, author, last_reply);
  }).fail(callback);

  Topic.findOne({_id: id}, proxy.done(function (topic) {
    if (!topic) {
      proxy.emit('topic', null);
      //proxy.emit('tags', []);
      proxy.emit('author', null);
      proxy.emit('last_reply', null);
      return;
    }
    proxy.emit('topic', topic);

    // TODO: 可以只查tag_id这个字段的吧？
    // TopicTag.find({topic_id: topic._id}, proxy.done(function (topic_tags) {
    //   var tags_id = [];
    //   for (var i = 0; i < topic_tags.length; i++) {
    //     tags_id.push(topic_tags[i].tag_id);
    //   }
    //   Tag.getTagsByIds(tags_id, proxy.done('tags'));
    // }));

    User.getUserById(topic.author_id, proxy.done('author'));

    if (topic.last_reply) {
      Reply.getReplyById(topic.last_reply, proxy.done(function (last_reply) {
        proxy.emit('last_reply', last_reply || null);
      }));
    } else {
      proxy.emit('last_reply', null);
    }
  }));
};
/**
 * 根据关键词，获取主题列表
 * Callback:
 * - err, 数据库错误
 * - count, 主题列表
 * @param {String} query 搜索关键词
 * @param {Object} opt 搜索选项
 * @param {Function} callback 回调函数
 */
exports.getTopicsByQuery = function (query, opt, callback) {
  Topic.find(query, '_id', opt, function (err, docs) {
    if (err) {
      return callback(err);
    }
    if (docs.length === 0) {
      return callback(null, []);
    }

    var topics_id = [];
    for (var i = 0; i < docs.length; i++) {
      topics_id.push(docs[i]._id);
    }

    var proxy = new EventProxy();
    var topics = [];
    proxy.after('topic_ready', topics_id.length, function () {
      return callback(null, topics);
    });
    proxy.fail(callback);

    topics_id.forEach(function (id, i) {
      exports.getTopicById(id, proxy.done(function (topic, author, last_reply) { 
        topic.author = author;
        topic.reply = last_reply;
        topic.friendly_create_at = Util.format_date(topic.create_at, true);
        topic.content = converter.makeHtml(topic.content);
        topics[i] = topic;
        proxy.emit('topic_ready');
      }));
    });
  });
};
/**
 * 获取关键词能搜索到的主题数量
 * Callback:
 * - err, 数据库错误
 * - count, 主题数量
 * @param {String} query 搜索关键词
 * @param {Function} callback 回调函数
 */
exports.getCountByQuery = function (query, callback) {
  Topic.count(query, callback);
};


exports.newAndSave = function (title, content, authorId, callback) {
  var topic = new Topic();
  topic.title = title;
  topic.content = content;
  topic.author_id = authorId;
  topic.save(callback);
};