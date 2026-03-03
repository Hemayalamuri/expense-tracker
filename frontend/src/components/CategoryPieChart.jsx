import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ expenses }) => {
    const byCategory = {};
    expenses.forEach(expense => {
        byCategory[expense.category] = (byCategory[expense.category] || 0) + Number(expense.amount);
    });

    const data = {
        labels: Object.keys(byCategory),
        datasets: [{
            data: Object.values(byCategory),
            backgroundColor: ['purple', 'blue', 'green', 'skyblue', 'red', 'orange', 'cyan', 'magenta','lime', 'teal', 'navy'],
        }],
    };

    return (
        <div style={{ maxWidth: '250px', margin: 0 }}>
            {/* <h2>Category Distribution</h2> */}
            <Pie data={data} />
        </div>
    );
};

export default CategoryPieChart;
