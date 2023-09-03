
export const CategoryList = ({ categories, currentPath, handleClick }) => {

  return (
    <>
      {categories.map((category, index) => (
        console.log(`currentPath: ${currentPath}, category.name: ${category.name}, same: ${currentPath == category.name}`),
       
        <div className={`nav-item ${ currentPath.trim().toLowerCase() === category.name.trim().toLowerCase() ? 'active' : '' }`} key={category.code}>
          <a onClick={() => handleClick(category.code)}>{category.name}</a>
        </div>
      ))}
    </>
  );
};
