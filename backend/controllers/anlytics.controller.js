import User from "../models/user.model.js";

export const analytics = async (req, res) => {
  try {
    const analyticsData = await getAnalytcicsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.json({ analyticsData, dailySalesData });
  } catch (error) {
    console.log("Error in analytics controller: ", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

async function getAnalytcicsData() {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      id: null,
      totalSales: { $sum: 1 },
      totalRevenue: { $sum: "$totalAmount" },
    },
  ]);

  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };

  return {
    user: totalUsers,
    products: totalProducts,
    totalSales,
    totalRevenue,
  };
}

async function getDailySalesData(startDate, endDate) {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const dateArray = getDatesArray(startDate, endDate);

    return dateArray.map((date) => {
      const foundData = dailySalesData.find((item) => item._id === date);

      return {
        date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      };
    });
  } catch (error) {
    throw error;
  }
}

function getDatesArray(startDate, endDate) {
  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
