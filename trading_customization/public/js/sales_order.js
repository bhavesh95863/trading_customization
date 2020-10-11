frappe.ui.form.on('Sales Order', {
	onload: function(frm) {
		let items = frm.get_field("items").grid;
		items.toggle_enable("amount", true);
	}
})

frappe.ui.form.on('Sales Order Item', {
	amount: function(frm,cdt,cdn) {
	    var doc = locals[cdt][cdn];
	    if (doc.qty && doc.amount){
	         frappe.model.set_value(cdt,cdn,"rate",doc.amount/doc.qty)
	    }
	   
	},
	item_code(frm,cdt,cdn) {
		// your code here
		var doc = locals[cdt][cdn];
		if (doc.item_code){
		    frappe.call({
		        method:"trading_customization.api.get_last_transaction",
		        args:{'c_doctype':doc.doctype,'p_doctype':frm.doc.doctype,'item':doc.item_code,'parent':doc.parent},
		        callback:function(r){
		            console.log(r)
		            if (r.message){
		                $(frm.fields_dict.last_transaction_custom.wrapper).empty().html(r.message)
		            }
		        }
		    })
		}
	}
})