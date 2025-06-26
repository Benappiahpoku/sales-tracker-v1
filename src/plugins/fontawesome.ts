import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Import icons you need from each style
import { 
    faUser, 
    faSpinner, 
    faBars,
    faPlus,
    faHome,
    faSearch,
    faSignOut,
    faPlusCircle,
    faDownload,
    faCog,
    faBell,
    faCopy, 
    faTimes,
    faEnvelope,
    faMobileScreen,
    faEye,
    faTrash,
    faTriangleExclamation,
    faReceipt,
    faArrowLeft, 
    faBox, 
    faListAlt,
    faCircle as fasCircle,
} from '@fortawesome/free-solid-svg-icons'

import { 
    faBell as farBell,
    
} from '@fortawesome/free-regular-svg-icons'

import { 
    faWhatsapp,
    faGithub 
} from '@fortawesome/free-brands-svg-icons'

// Add icons to the library
library.add(
    // Solid icons
    faUser, 
    faSpinner, 
    faBars,
    faPlus,
    faHome,
    faSearch,
    faSignOut,
    faCog,
    faBell,
    faPlusCircle,
    faDownload,
    faCopy, 
    faTimes,
    faEnvelope,
    faMobileScreen,
    faArrowLeft,
    faBox,
    faListAlt,
    faEye,
    faTrash,
    faTriangleExclamation,
    faReceipt,
    // Regular icons
    farBell,
    fasCircle,
    // Brand icons
    faWhatsapp,
    faGithub
)

export { FontAwesomeIcon }