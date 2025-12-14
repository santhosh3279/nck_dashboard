// For Opening Amount Calculation
frappe.ui.form.on('Sale_Entry', {
  fivehundred: calculate_total,
  twohundred: calculate_total,
  hundred: calculate_total,
  fifty: calculate_total,
  twenty: calculate_total,
  ten: calculate_total,
  five: calculate_total,
  two: calculate_total,
  one: calculate_total,
});

function calculate_total(frm) {
  let total =
    (frm.doc.fivehundred || 0) * 500 +
    (frm.doc.twohundred || 0) * 200 +
    (frm.doc.hundred || 0) * 100 +
    (frm.doc.fifty || 0) * 50 +
    (frm.doc.twenty || 0) * 20 +
    (frm.doc.ten || 0) * 10 +
    (frm.doc.five || 0) * 5 +
    (frm.doc.two || 0) * 2 +
    (frm.doc.one || 0) * 1;
  frm.set_value('total', total);
  // frm.save();
}
//For Uppercase Bill No.
frappe.ui.form.on('Daily Sales', {
  bill_no(frm, cdt, cdn) {
    let r = locals[cdt][cdn];
    if (r.bill_no) {
      frappe.model.set_value(cdt, cdn, 'bill_no', r.bill_no.toUpperCase());
    }
  }
});


frappe.ui.form.on('Daily Sales', {
  cash: calculate_sale_row,
  credit: calculate_sale_row,
  card: calculate_sale_row,
  upi: calculate_sale_row,
  wholesale: calculate_sale_row,
  retail: calculate_sale_row
});

function calculate_sale_row(frm, cdt, cdn) {
  let r = locals[cdt][cdn];

  let total =
    (r.wholesale || 0) +
    (r.retail || 0) -
    (r.cash || 0) -
    (r.card || 0) -
    (r.credit || 0) -
    (r.upi || 0);

  frappe.model.set_value(cdt, cdn, 'discount', total);
  calculate_parent_totals(frm);
}

function calculate_parent_totals(frm) {
  let cash = 0, card = 0, credit = 0, upi = 0, discount = 0;

  (frm.doc.sale_entry || []).forEach(r => {   // sale = child table fieldname
    cash += r.cash || 0;
    card += r.card || 0;
    credit += r.credit || 0;
    upi += r.upi || 0;
    discount += r.discount || 0;
  });

  frm.set_value('cash_total', cash);
  frm.set_value('card', card);
  frm.set_value('credit', credit);
  frm.set_value('upi_total', upi);
  frm.set_value('discount', discount);
  frm.set_value('box_cash', cash + frm.doc.total)
}




