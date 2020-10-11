from __future__ import unicode_literals
from frappe import msgprint, _
import frappe
from frappe.utils import today

@frappe.whitelist()
def get_last_transaction(c_doctype,p_doctype,item,parent):
	filters = [
		["item_code","=",item],
		["docstatus","=",1],
		["parent","!=",parent]
	]
	transaction_list = frappe.get_all(c_doctype,filters=filters,fields=["item_code","qty","rate","parent"],limit_page_length=5)
	return frappe.render_template("trading_customization/templates/last_transaction.html",{'data':transaction_list,'doctype':p_doctype})

	
