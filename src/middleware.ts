import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path.startsWith('/login')
  const isCompanyPath = path.startsWith('/company')
  const isHomePath = path.startsWith('/home')

  const isFinancePath = isPathRequiringFinance(path)
  const isSalePath = isPathRequiringSale(path)
  const isPurchasePath = isPathRequiringPurchase(path)
  const isProductionPath = isPathRequiringProduction(path)
  const isInventoryPath = isPathRequiringInventory(path)
  const isTaskPath = isPathRequiringTask(path)
  const isAttachmentPath = isPathRequiringAttachment(path)
  const isApprovalPath = isPathRequiringApprovalView(path)

  const tokenCookie = request.cookies.get('tokenLogin')
  const token = tokenCookie ? tokenCookie.value : ''

  const compTokenCookie = request.cookies.get('tokenComp')
  const compToken = compTokenCookie ? compTokenCookie.value : ''

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login/', request.nextUrl))
  }


  if (!isCompanyPath && !compToken && !isPublicPath) {
    return NextResponse.redirect(new URL('/company/', request.nextUrl))
  }

  // Redirect to company page if either token is missing and trying to access home page
  if (isHomePath && (!token || !compToken)) {
    return NextResponse.redirect(new URL('/company/', request.nextUrl))
  }

  const financePermission = request.cookies.get('Finance')
  const salePermission = request.cookies.get('Sale')
  const purchasePermission = request.cookies.get('Purchase')
  const productionPermission = request.cookies.get('Production')
  const inventoryPermission = request.cookies.get('Inventory')
  const taskPermission = request.cookies.get('Task')
  const attachmentPermission = request.cookies.get('Attachment')
  const approvalPermission = request.cookies.get('Approval')

  if (path.startsWith('/finance') && financePermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (path.startsWith('/sale') && salePermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (path.startsWith('/purchase') && purchasePermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (path.startsWith('/production') && productionPermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (path.startsWith('/inventory') && inventoryPermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (path.startsWith('/task') && taskPermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (path.startsWith('/attachment') && attachmentPermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (path.startsWith('/approval') && approvalPermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }


  if (isFinancePath && financePermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (isSalePath && salePermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (isPurchasePath && purchasePermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (isProductionPath && productionPermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (isInventoryPath && inventoryPermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (isTaskPath && taskPermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (isAttachmentPath && attachmentPermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }

  if (isApprovalPath && approvalPermission?.value !== '1') {
    return NextResponse.redirect(new URL('/home/', request.nextUrl))
  }


  return NextResponse.next()
}

function isPathRequiringFinance(path: string): boolean {
  const pathsRequiringFinance = [
    /^\/finance\/.*$/, // Updated to use a regex instead of a string
  ]

  return pathsRequiringFinance.some(p => p.test(path))
}

function isPathRequiringSale(path: string): boolean {
  const pathsRequiringSale = [
    /^\/sale\/.*$/, // Updated to use a regex instead of a string
  ]

  return pathsRequiringSale.some(p => p.test(path))
}

function isPathRequiringPurchase(path: string): boolean {
  const pathsRequiringPurchase = [
    /^\/purchase\/.*$/, // Updated to use a regex instead of a string
  ]

  return pathsRequiringPurchase.some(p => p.test(path))
}

function isPathRequiringProduction(path: string): boolean {
  const pathsRequiringProduction = [
    /^\/production\/.*$/, // Updated to use a regex instead of a string
  ]

  return pathsRequiringProduction.some(p => p.test(path))
}

function isPathRequiringInventory(path: string): boolean {
  const pathsRequiringInventory = [
    /^\/inventory\/.*$/, // Updated to use a regex instead of a string
  ]

  return pathsRequiringInventory.some(p => p.test(path))
}

function isPathRequiringTask(path: string): boolean {
  const pathsRequiringTask = [
    /^\/task\/.*$/, // Updated to use a regex instead of a string
  ]

  return pathsRequiringTask.some(p => p.test(path))
}

function isPathRequiringAttachment(path: string): boolean {
  const pathsRequiringAttachment = [
    /^\/attachment\/.*$/, // Updated to use a regex instead of a string
  ]

  return pathsRequiringAttachment.some(p => p.test(path))
}

function isPathRequiringApprovalView(path: string): boolean {
  const pathsRequiringApproval = [
    /^\/approval\/.*$/, // Updated to use a regex instead of a string
  ]

  return pathsRequiringApproval.some(p => p.test(path))
}

export const config = {
  matcher: [
    '/',
    '/company/',
    '/login/',
    '/home/',
    '/home/:path*',
    '/finance/:path*',
    '/sale/:path*',
    '/purchase/:path*',
    '/production/:path*',
    '/inventory/:path*',
    '/task/:path*',
    '/attachment/:path*',
    '/approval/',
    '/approval/:path*',
    '/pages/:path*',
    '/SiteMaster/'
  ]
}



// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // Placeholder for Secure Storage handling (client-side)
// import secureLocalStorage from 'react-secure-storage'

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname

//   const isPublicPath = path.startsWith('/login')
//   const isCompanyPath = path.startsWith('/company')
//   const isHomePath = path.startsWith('/home')

//   const isFinancePath = isPathRequiringFinance(path)
//   const isSalePath = isPathRequiringSale(path)
//   const isPurchasePath = isPathRequiringPurchase(path)
//   const isProductionPath = isPathRequiringProduction(path)
//   const isInventoryPath = isPathRequiringInventory(path)
//   const isTaskPath = isPathRequiringTask(path)
//   const isAttachmentPath = isPathRequiringAttachment(path)
//   const isApprovalPath = isPathRequiringApprovalView(path)

//   // Accessing Secure Local Storage
//   const token = secureLocalStorage.getItem('tokenLogin')
//   const compToken = secureLocalStorage.getItem('tokenComp')

//   // Redirect to login page if no login token is present and not already on login page
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/login/', request.nextUrl))
//   }

//   // Redirect to company page if no company token is present and not on company page or login page
//   if (!isCompanyPath && !compToken && !isPublicPath) {
//     return NextResponse.redirect(new URL('/company/', request.nextUrl))
//   }

//   // Redirect to company page if either token is missing and trying to access home page
//   if (isHomePath && (!token || !compToken)) {
//     return NextResponse.redirect(new URL('/company/', request.nextUrl))
//   }

//   // Placeholder for Permissions
//   const financePermission = secureLocalStorage.getItem('Finance')
//   const salePermission = secureLocalStorage.getItem('Sale')
//   const purchasePermission = secureLocalStorage.getItem('Purchase')
//   const productionPermission = secureLocalStorage.getItem('Production')
//   const inventoryPermission = secureLocalStorage.getItem('Inventory')
//   const taskPermission = secureLocalStorage.getItem('Task')
//   const attachmentPermission = secureLocalStorage.getItem('Attachment')
//   const approvalPermission = secureLocalStorage.getItem('Approval')

//   // Add your permission checks and redirections here

//   if (path.startsWith('/finance/') && financePermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (path.startsWith('/sale/') && salePermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (path.startsWith('/purchase/') && purchasePermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (path.startsWith('/production/') && productionPermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (path.startsWith('/inventory/') && inventoryPermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (path.startsWith('/task/') && taskPermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (path.startsWith('/attachment/') && attachmentPermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (path.startsWith('/approval/') && approvalPermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (isFinancePath && financePermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (isSalePath && salePermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (isPurchasePath && purchasePermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (isProductionPath && productionPermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (isInventoryPath && inventoryPermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (isTaskPath && taskPermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (isAttachmentPath && attachmentPermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   if (isApprovalPath && approvalPermission !== '1') {
//     return NextResponse.redirect(new URL('/home/', request.nextUrl))
//   }

//   return NextResponse.next()
// }

// function isPathRequiringFinance(path: string): boolean {
//   const pathsRequiringFinance = [
//     /^\/finance\/.*$/, // Updated to use a regex instead of a string
//   ]

//   return pathsRequiringFinance.some(p => p.test(path))
// }

// function isPathRequiringSale(path: string): boolean {
//   const pathsRequiringSale = [
//     /^\/sale\/.*$/, // Updated to use a regex instead of a string
//   ]

//   return pathsRequiringSale.some(p => p.test(path))
// }

// function isPathRequiringPurchase(path: string): boolean {
//   const pathsRequiringPurchase = [
//     /^\/purchase\/.*$/, // Updated to use a regex instead of a string
//   ]

//   return pathsRequiringPurchase.some(p => p.test(path))
// }

// function isPathRequiringProduction(path: string): boolean {
//   const pathsRequiringProduction = [
//     /^\/production\/.*$/, // Updated to use a regex instead of a string
//   ]

//   return pathsRequiringProduction.some(p => p.test(path))
// }

// function isPathRequiringInventory(path: string): boolean {
//   const pathsRequiringInventory = [
//     /^\/inventory\/.*$/, // Updated to use a regex instead of a string
//   ]

//   return pathsRequiringInventory.some(p => p.test(path))
// }

// function isPathRequiringTask(path: string): boolean {
//   const pathsRequiringTask = [
//     /^\/task\/.*$/, // Updated to use a regex instead of a string
//   ]

//   return pathsRequiringTask.some(p => p.test(path))
// }

// function isPathRequiringAttachment(path: string): boolean {
//   const pathsRequiringAttachment = [
//     /^\/attachment\/.*$/, // Updated to use a regex instead of a string
//   ]

//   return pathsRequiringAttachment.some(p => p.test(path))
// }

// function isPathRequiringApprovalView(path: string): boolean {
//   const pathsRequiringApproval = [
//     /^\/approval\/.*$/, // Updated to use a regex instead of a string
//   ]

//   return pathsRequiringApproval.some(p => p.test(path))
// }

// export const config = {
//   matcher: [
//     '/',
//     '/company/',
//     '/login/',
//     '/home/',
//     '/home/:path*',
//     '/finance/:path*',
//     '/sale/:path*',
//     '/purchase/:path*',
//     '/production/:path*',
//     '/inventory/:path*',
//     '/task/:path*',
//     '/attachment/:path*',
//     '/approval/:path*',
//     '/pages/:path*',
//     '/SiteMaster/'
//   ]
// }
