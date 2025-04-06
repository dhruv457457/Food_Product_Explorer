function Navbar(){
    return(

<nav className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50" 
 >  
<h1 className="text-xl font-bold text-indigo-600">FoodExpo</h1>
    <div>
<input type="text" placeholder='Search Your Product' className="" />
<input type="text"
placeholder="Search by barcode"
className="px-3 py-1 border rounded" />
        </div>
</nav>


    );
}
export default Navbar;