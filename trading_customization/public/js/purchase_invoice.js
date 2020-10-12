frappe.ui.form.on('Purchase Invoice', {
	onload: function(frm) {
		let items = frm.get_field("items").grid;
		items.toggle_enable("amount", true);

		frm.set_query("uom", "items", function(doc, cdt, cdn) {
			const row = locals[cdt][cdn];

			return {
				query: "trading_customization.api.uom_query",
				filters: {
					'item_code': row.item_code
				}
			};
		});
	},
	after_save: function(frm) {
		$(frm.fields_dict.last_transaction_custom.wrapper).empty()
	}
})

frappe.ui.form.on('Purchase Invoice Item', {
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