export const Notification = ({ status }) => {
    if (status === "") {
        return null
    }

    const styleSuccess = {
        backgroundColor: "#B4F8C8",
        padding: 5,
        border: "1px solid green",
        marginBottom: 10,
    }

    const styleError = {
        backgroundColor: "#FFAEBC",
        padding: 5,
        border: "1px solid red",
        marginBottom: 10,
    }

    return (
        <div style={status.includes("Added") ? styleSuccess : styleError}>{status}</div>
    )
}