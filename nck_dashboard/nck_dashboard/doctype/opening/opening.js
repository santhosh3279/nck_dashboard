// Copyright (c) 2025, Santhosh  and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Opening", {
// 	refresh(frm) {

// 	},
// });
// frappe.ui.form.on('Opening', {
//   fivehundred(frm) {
//     calculate_total(frm);
//   },
//     twohundred(frm) {
//     calculate_total(frm);
//   }

// });

frappe.ui.form.on('Opening', {
  fivehundred: calculate_total,
  twohundred: calculate_total,
  hundred: calculate_total,
  fifty: calculate_total,
  twenty: calculate_total,
  ten: calculate_total,
  five: calculate_total,
  two: calculate_total,
  one: calculate_total,
  marg_opening: calculate_diff
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
}

function calculate_diff(frm) {
  let short_or_excess =
    (frm.doc.total || 0) -
    (frm.doc.marg_opening || 0) ;

  frm.set_value('short_or_excess', short_or_excess);
}