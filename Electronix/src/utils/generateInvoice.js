import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ================= CURRENCY FORMAT ================= */
/* Output: ₹ 1,399 */
const formatCurrency = (amount) => {
  return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
};

export const generateInvoice = (order, user) => {
  try {
    const doc = new jsPDF("p", "mm", "a4");

    const NAVY = "#0a1a44";

    /* ================= HEADER ================= */
    doc.setTextColor(NAVY);
    doc.setFontSize(20);
    doc.setFont(undefined, "bold");
    doc.text("Electronix Hub", 14, 20);

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.text("INVOICE", 180, 20, { align: "right" });

    doc.setDrawColor(180);
    doc.line(14, 24, 196, 24);

    /* ================= ORDER INFO ================= */
    doc.setTextColor(0);
    doc.setFontSize(11);

    const orderDate = order.createdAt?.toDate
      ? order.createdAt.toDate().toLocaleDateString("en-IN")
      : new Date().toLocaleDateString("en-IN");

    doc.text(`Order ID: ${order.id}`, 14, 34);
    doc.text(`Order Date: ${orderDate}`, 14, 40);

    /* ================= BILLING DETAILS ================= */
    doc.setFont(undefined, "bold");
    doc.text("Billing Details", 14, 52);

    doc.setFont(undefined, "normal");
    const address = order.address || {};

    doc.text(address.fullName || user?.displayName || "Customer", 14, 60);
    doc.text(address.addressLine || "—", 14, 66);
    doc.text(
      `${address.city || ""}, ${address.state || ""}, ${
        address.country || ""
      } - ${address.zip || ""}`,
      14,
      72
    );
    doc.text(`Phone: ${address.phone || "N/A"}`, 14, 78);
    doc.text(`Email: ${address.email || user?.email || "N/A"}`, 14, 84);

    /* ================= PRODUCTS TABLE ================= */
    const tableData = order.items.map((item) => [
      item.productName,
      item.quantity.toString(),
      formatCurrency(item.price),
      formatCurrency(item.price * item.quantity),
    ]);

    autoTable(doc, {
      startY: 95,
      head: [["Product", "Qty", "Price", "Total"]],
      body: tableData,
      theme: "plain",
      headStyles: {
        textColor: NAVY,
        fontStyle: "bold",
        halign: "left",
      },
      columnStyles: {
        1: { halign: "center" },
        2: { halign: "right" },
        3: { halign: "right" },
      },
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
    });

    const finalY = doc.lastAutoTable.finalY + 8;

    /* ================= TOTALS ================= */
    doc.setFontSize(11);

    doc.text("Subtotal", 140, finalY);
    doc.text(formatCurrency(order.subtotal || order.total), 195, finalY, {
      align: "right",
    });

    doc.text("Shipping", 140, finalY + 6);
    doc.text(formatCurrency(order.shipping || 0), 195, finalY + 6, {
      align: "right",
    });

    doc.setDrawColor(150);
    doc.line(140, finalY + 9, 195, finalY + 9);

    doc.setFont(undefined, "bold");
    doc.setFontSize(13);
    doc.text("Grand Total", 140, finalY + 18);
    doc.text(formatCurrency(order.total), 195, finalY + 18, {
      align: "right",
    });

    doc.setFont(undefined, "normal");

    /* ================= FOOTER ================= */
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(
      "Thank you for shopping with Electronix Hub!",
      105,
      285,
      { align: "center" }
    );

    doc.save(`Invoice_${order.id}.pdf`);
  } catch (error) {
    console.error("Invoice generation failed:", error);
    alert("Failed to generate invoice. Please try again.");
  }
};
