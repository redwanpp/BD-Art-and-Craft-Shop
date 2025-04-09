import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react';
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion';
import CreateProductForm from '../components/CreateProductForm';
import ProductsLists from '../components/ProductsLists';
import AnalyticsTab from '../components/AnalyticsTab';
import { useProductStore } from '../stores/useProductStore';



const tabs = [
    {id: "create", label: "Create Product", Icon: PlusCircle },
    {id: "products", label: "Products", Icon: ShoppingBasket},
    {id: "analytics", label: "Analytics", Icon: BarChart}
];

export const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create");
    const {fetchAllProducts} = useProductStore();

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);
  return (
    <div className='min-h-screen bg-gray-900 text-cyan-400 relative overflow-hidden'>
        <div className='relative z-10 container mx-auto px-4 py-4'>
            <motion.h1 className='text-4xl font-bold mb-8 container mx-auto px-4 py-16' initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} 
            transition={{duration: 0.8}}>
                Admin Dashboard
            </motion.h1>
        
            

            <div className='flex justify-center mb-8'>
					{tabs.map((tab) => ( 
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-cyan-600 text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
							}`}
						>
							<tab.Icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>
            {activeTab === "create" && <CreateProductForm />}
            {activeTab === "products" && <ProductsLists />}
            {activeTab === "analytics" && <AnalyticsTab />}
        </div>
    </div>
  )
}
