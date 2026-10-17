# UI Spec: Gradiators Banking Service UI

## 1. Overview
This is a mock mobile banking application. The bank name is Gradiators Banking. It will consist of four pages: Home, Transactions, Make a Payment, and Payment Success / Failure.

## 2. Tech & conventions
- Stack: React + Vite
- No third-party routing libraries (e.g. React Router). Page navigation is handled with React's useState.
- 

## 3. Design system

### Principles
- The whole UI is built in a mobile aspect ratio (375 × 812, portrait), centred on larger screens.
- The Area that is not within this apsect ratio should be black. However the corners of the "Mobile Screen" should be rounded.  
- Mobile-first (design at 375px, minimum 320px).
- WCAG AA contrast; touch targets at least 44×44px.
- Don't rely on colour alone (credits use "+", debits "−").
- Pages should have a transition between them. The transction should be a right or left swipe animation, depending on whether the page is a forwards or backwards move
- You can refer to the graph file to see if it's a forwards or backwards movement. 
- Each button press should make the button go slightly darker. 

### Colours (CSS variables, light/dark)
--primary:        #1F4E79 / #5B9BD5
--background:     #F7F8FA / #0F1115
--surface:        #FFFFFF / #1A1D23
--border:         #E2E5EA / #2C313A
--text:           #111827 / #F3F4F6
--text-secondary: #6B7280 / #9CA3AF
--success:        #15803D / #4ADE80
--warning:        #B45309 / #FBBF24
--danger:         #B91C1C / #F87171

### Typography
- Font: Inter, fallback system-ui.
- Sizes: 32 (balance), 24 (titles), 18 (sections), 16 (body), 13 (captions).
- Amounts use tabular numbers.

### Spacing
- 4px scale: 4, 8, 12, 16, 24, 32.
- Screen padding 16px; radius 8px (buttons, inputs), 16px (cards, sheets).

### Shared components
- Button: primary, secondary, destructive; 48px tall, full width on mobile; loading and disabled states.
- Input: visible label, error message below; amount input uses numeric keypad.
- Card: account card and transaction row (icon, name/date, amount).
- Toasts for confirmations, skeleton loaders for loading.

### Icons
- Lucide, outline, 24px; icon-only buttons need an aria-label.

### Layout
- The whole UI is built in a mobile aspect ratio (375 × 812, portrait).
- On larger screens, the app stays at this size and is centred in the window; it does not stretch or change layout.

## Page 1 (Home screen)
A single screen with two buttons. This will welcome the user to the application. The user's name will be hardcoded as Hugh for now.
- One button takes the user to the Transactions page.
- The other button takes the user to the Make a Payment page.
- This should be centered in the middle of the screen (Vertically)

## Page 2 (Transactions Page)
This will be a screen where the user can see their previous payments (incoming and outgoing).
At the top of the screen, the amount in the user's bank account will be shown. This will NOT be hardcoded, but will be calculated from the transactions SOT JSON file.
At the point that this MD file is implemented, the transactions SOT file will already be implemented.
Each row will show the amount paid in / paid out and the merchant name. Users will be able to expand a row (the row should expand downwards) to see all the details present in the schema.
The Parent screen should have no scroll. The Transactions List should be it's own container that has scrolling inside that container. 
This page has a Home button that takes the user back to the Home screen. This home button should be square and at the top right of the screen.

## Page 3 (Make a Payment Page)
This is the screen where a user can make a payment. It should contain the following fields:
- Payee name
- Sort code
- Account number
- Business / Personal account
At the bottom, a "CONFIRM PAYMENT" button.
This page has a Home button that takes the user back to the Home screen. This home button should be square and at the top right of the screen.
This page should be centered vertically. 

## Page 4 (Payment Success / Failure Page)
This is the screen shown after the user has pressed the CONFIRM PAYMENT button.
It will show the details of the payment they have just made.
At the bottom, it should have two options: return to the Make a Payment page, or return to the Home screen.