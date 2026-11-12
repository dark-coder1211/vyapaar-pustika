import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { ShowHeaderOHProps } from "../interfaces/page";

const ShowHeaderOHComp = <T,>({
    open,
    onClose,
    fetchItems,
    columnsConfig,
    title,
    dialogWidth = "600px"
}: ShowHeaderOHProps<T> & { dialogWidth?: string; selectedItem?: T }) => {
    const [items, setItems] = useState<any[]>([]);
    const isMobile = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchItems();
                setItems(response);
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        };
        fetchData();
    }, [fetchItems]);

    // Calculate totals safely (parse floats if required)
    const totalDebit = items.reduce((sum, item) => sum + (parseFloat(item.Debit) || 0), 0);
    const totalCredit = items.reduce((sum, item) => sum + (parseFloat(item.Credit) || 0), 0);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: isMobile ? "90%" : dialogWidth,
                    backgroundColor: "#f9f9f9",
                    overflow: "unset",
                    overflowY: "auto",
                    borderRadius: "10px",
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontSize: "13px",
                    fontWeight: "600",
                    textAlign: "left",
                    padding: "16px 24px 8px 24px",
                    borderBottom: "1px solid #ddd",
                    color: "#333",
                    mb: -1,
                }}
            >
                {title}
            </DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "4px",
                    paddingBottom: "16px",
                }}
            >
                <div
                    style={{
                        flexGrow: 1,
                        overflowY: "auto",
                        maxHeight: isMobile ? "calc(80vh - 56px)" : "calc(80vh - 56px)",
                    }}
                >
                    <TableContainer
                        component={Paper}
                        sx={{
                            maxHeight: "300px",
                            overflowY: "auto",
                            borderRadius: "10px",
                        }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columnsConfig
                                        .filter((col) => col.visible)
                                        .map((column) => (
                                            <TableCell
                                                key={column.index}
                                                sx={{ padding: "7px", height: "35px", textAlign: column.align }}
                                                width={column.width}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columnsConfig.filter((col) => col.visible).length}
                                            sx={{ textAlign: "center", padding: "20px", fontSize: "14px", color: "#888" }}
                                        >
                                            No record found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    items.map((item) => (
                                        <TableRow key={item.Code} hover sx={{ cursor: "pointer" }}>
                                            {columnsConfig
                                                .filter((col) => col.visible)
                                                .map((column) => (
                                                    <TableCell
                                                        key={column.index}
                                                        sx={{
                                                            padding: "5px",
                                                            height: "30px",
                                                            border: "1px solid #f4f4f5",
                                                            fontSize: "11px",
                                                        }}
                                                        width={column.width}
                                                        align={column.align}
                                                    >
                                                        {item[column.field] || ""}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </DialogContent>

            <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 24px 16px 24px",
                    minHeight: "48px",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#333",
                        display: "flex",
                        alignItems: "center",
                        gap: "24px"
                    }}
                >
                    <span> Total</span>
                    <span> Debit: {totalDebit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    <span> Credit: {totalCredit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                </Typography>

                <div>
                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{
                            textTransform: "none",
                            minWidth: "80px",
                            fontWeight: 600,
                            fontSize: "12px",
                        }}
                    >
                        OK
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{
                            textTransform: "none",
                            minWidth: "80px",
                            fontWeight: 600,
                            fontSize: "12px",
                            mr: 1,
                        }}
                    >
                        Cancel
                    </Button>

                </div>
            </DialogActions>
        </Dialog>
    );
};

export default ShowHeaderOHComp;
