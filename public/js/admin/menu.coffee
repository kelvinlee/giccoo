$(document).ready ->
	$("#dataMenuTable").dataTable
		"sPaginationType":"full_numbers"
		aoColumnDefs: [
			 {
			 	bSortable: false
			 	aTargets: [0, -1]
			 }
		]
		oLanguage: {
			"sLengthMenu": "<a href='/admin/menu/new' class='btn btn-xs btn-info addnew'>Add new menu</a>"
			"sZeroRecords": "Nothing found - sorry"
		}


