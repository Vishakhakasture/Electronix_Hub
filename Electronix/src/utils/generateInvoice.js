import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatNumber = (amount) =>
  Number(amount || 0).toLocaleString("en-IN");

export const generateInvoice = (order, user) => {
  try {
    const doc = new jsPDF("p", "mm", "a4");

    const DARK = "#111111";
    const GREY = "#666666";
    const LIGHT_GREY = "#eeeeee";

    const PAGE_WIDTH = doc.internal.pageSize.getWidth();
    const MARGIN = 20;
    const TABLE_WIDTH = PAGE_WIDTH - MARGIN * 2;

    doc.setFontSize(26);
    doc.setFont(undefined, "bold");
    doc.setTextColor(DARK);
    doc.text("INVOICE", MARGIN, 30);

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text(`Invoice No: ${order.id}`, PAGE_WIDTH - MARGIN, 20, { align: "right" });

    const orderDate = order.createdAt?.toDate
      ? order.createdAt.toDate().toLocaleDateString("en-IN")
      : new Date().toLocaleDateString("en-IN");

    doc.text(`Date: ${orderDate}`, PAGE_WIDTH - MARGIN, 26, { align: "right" });

    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text("Billed To:", MARGIN, 50);
    doc.text("From:", PAGE_WIDTH / 2 + 10, 50);

    doc.setFont(undefined, "normal");

    const address = order.address || {};

    doc.text(address.fullName || user?.displayName || "Customer", MARGIN, 58);
    doc.text(address.addressLine || "—", MARGIN, 64);
    doc.text(`${address.city || ""}, ${address.state || ""}`, MARGIN, 70);
    doc.text(address.country || "", MARGIN, 76);
    doc.text(address.email || user?.email || "—", MARGIN, 82);

    doc.text("Electronix Hub", PAGE_WIDTH / 2 + 10, 58);
    doc.text("Viman Nagar", PAGE_WIDTH / 2 + 10, 64);
    doc.text("Pune, Maharashtra", PAGE_WIDTH / 2 + 10, 70);
    doc.text("India", PAGE_WIDTH / 2 + 10, 76);
    doc.text("support@electronixhub.com", PAGE_WIDTH / 2 + 10, 82);

    const tableData = order.items.map((item) => [
      item.productName,
      item.quantity,
      formatNumber(item.price),
      formatNumber(item.price * item.quantity),
    ]);

    autoTable(doc, {
      startY: 95,
      margin: { left: MARGIN, right: MARGIN },
      tableWidth: TABLE_WIDTH,
      head: [["Item", "Quantity", "Price", "Amount"]],
      body: tableData,
      theme: "plain",
      headStyles: {
        fillColor: LIGHT_GREY,
        textColor: DARK,
        fontStyle: "bold",
        halign: "center",
      },
      styles: {
        fontSize: 10,
        cellPadding: 6,
        valign: "top",
        overflow: "linebreak",
      },
      columnStyles: {
        0: { cellWidth: 90, halign: "left" },
        1: { cellWidth: 27, halign: "center" },
        2: { cellWidth: 32, halign: "center" },
        3: { cellWidth: 32, halign: "center" },
      },
    });

    const finalY = doc.lastAutoTable.finalY + 8;

    const priceColumnX = MARGIN + 90 + 27;
    const amountColumnX = MARGIN + TABLE_WIDTH;

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");

    doc.text("Subtotal", priceColumnX, finalY);
    doc.text(formatNumber(order.subtotal || order.total), amountColumnX, finalY, {
      align: "right",
    });

    doc.text("Shipping", priceColumnX, finalY + 7);
    doc.text(formatNumber(order.shipping || 0), amountColumnX, finalY + 7, {
      align: "right",
    });

    doc.setDrawColor(180);
    doc.line(priceColumnX, finalY + 10, amountColumnX, finalY + 10);

    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text("Total", priceColumnX, finalY + 20);
    doc.text(`Rs. ${formatNumber(order.total)}`, amountColumnX, finalY + 20, {
      align: "right",
    });

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.setTextColor(GREY);
    doc.text(
      "Thank you for choosing Electronix Hub!",
      PAGE_WIDTH / 2,
      285,
      { align: "center" }
    );

    doc.save(`Invoice_${order.id}.pdf`);
  } catch (error) {
    console.error("Invoice generation failed:", error);
    alert("Failed to generate invoice. Please try again.");
  }
};
