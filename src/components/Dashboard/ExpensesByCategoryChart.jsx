import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

const ExpensesByCategoryChart = () => {
  const { getExpensesByCategory, formatCurrency } = useFinance();
  const [chartHeight, setChartHeight] = useState(300);
  
  // Category colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Adjust chart height based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartHeight(200);
      } else {
        setChartHeight(300);
      }
    };

    // Set initial height
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Custom rendering for pie chart labels
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = window.innerWidth < 768 ? outerRadius * 0.5 : outerRadius * 0.8;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // On mobile, only show percentages for larger segments
    if (window.innerWidth < 768 && percent < 0.1) {
      return null;
    }

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={window.innerWidth < 768 ? '10' : '12'}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Mobile-friendly responsive legend that moves to the bottom on small screens
  const renderMobileResponsiveLegend = (props) => {
    const { payload } = props;
    
    return (
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-indigo-200 truncate">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-4 inline-flex items-center text-indigo-200">
        <Activity size={18} className="mr-2 text-indigo-400" />
        Expenses by Category
      </h3>
      <div style={{ height: chartHeight }} className="mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={getExpensesByCategory()}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={window.innerWidth < 768 ? 70 : 100}
              fill="#8884d8"
              dataKey="value"
              label={renderCustomizedLabel}
            >
              {getExpensesByCategory().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => formatCurrency(value)} 
              contentStyle={{ 
                backgroundColor: 'rgba(30, 27, 75, 0.9)',
                borderColor: 'rgba(79, 70, 229, 0.5)',
                borderRadius: '8px',
                color: '#e0e7ff' 
              }}
            />
            <Legend content={renderMobileResponsiveLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensesByCategoryChart;