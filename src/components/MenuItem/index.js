import './index.css'

const MenuItem = props => {
  const {details, onClickMenu, activeId} = props
  const {menuCategory, menuCategoryId} = details
  const getId = () => {
    onClickMenu(menuCategoryId)
  }
  const activeMenu = activeId === menuCategoryId ? 'style-1' : 'style-2'
  return (
    <li>
      <button
        type="button"
        className={`${activeMenu} menu-category-button`}
        onClick={getId}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default MenuItem
