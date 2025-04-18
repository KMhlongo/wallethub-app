import { Link, useNavigate } from "react-router"

/**
 * 
 * @param destination path prefixed by '/'
 * @param isActive if link points to the current page
 * @returns 
 */
function NavBarLink({destination, children, isActive, srch}: 
    {destination: string, children: Children, isActive: boolean, srch?: string}) 
{

    return(
        <Link to={{pathname:destination, search: srch || ''}} 
            className={`text-xl mr-8 hover:opacity-100 hover:cursor-pointer text-white hover:text-white ${isActive ? 'opacity-100' : 'opacity-60'}`}
            >
            {children}
        </Link>
    )

}

export default NavBarLink;