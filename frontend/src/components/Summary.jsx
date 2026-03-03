import CategoryPieChart from "./CategoryPieChart";

const Summary = ({ expenses }) => {
    const  total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const byCategory = {};
    expenses.forEach(expense => {
        byCategory[expense.category]= (
            byCategory[expense.category] || 0) + expense.amount;
    });

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', maxWidth: 500 }}>
            <div style={{ flex: 1 }}>
                <h2>Summary</h2>
                <p><b>Total :</b> RS.{total}</p>
                {Object.keys(byCategory).map(cat => (
                    <p key={cat}>{cat}: RS.{byCategory[cat]}</p>
                ))}
            </div>
            <CategoryPieChart expenses={expenses} />
        </div>
    );
};

export default Summary;