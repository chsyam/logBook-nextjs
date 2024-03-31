export async function addTransactionHandle() {
    try {
        const users_included = [];
        checkedItems.split(",")?.forEach(item => {
            users_included.push(item.trim());
        })
        console.log(users_included);
        const response = await axios.post('http://localhost:8080/transactions/save',
            {
                "amount": amount, "description": description, "users_included": users_included, "owner": owner
            },
        );
        if (response.status === 200) {
            return "Success";
        } else {
            return "Failed"
        }
    } catch (error) {
        console.error(error.message);
    }
}