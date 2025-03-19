# Haat Delivery React Native Project

## Prerequisites

- Node.js (version >=14)
- npm or yarn
- React Native CLI
- Android Studio (for Android) or Xcode (for iOS)

## Setup Instructions

1.  Clone the repository:

    ```bash
    git clone https://github.com/Maulik710/HaatDelivery.git
    cd HaatDelivery

    ```

2.  Install dependencies:
    npm install

    # OR

    yarn install

3.  Set up the Android or iOS environment:

    For Android:
    Open Android Studio, install necessary SDKs and start an emulator.
    Run the project on the emulator or a connected device:

        npx react-native run-android

    For iOS:
    Install CocoaPods:

             cd ios && pod install && cd ..

        Run the project on the iOS simulator

            npx react-native run-ios

# Features

1. Category Navigation:
    - Horizontal scrollable list of market categories.
    - Users can select a category to view related subcategories and products.
  
2. Subcategory Navigation:
    - Horizontal scrollable list of subcategories within the selected category.
    - Upon selection, products of the chosen subcategory are displayed.
  
3. Product Grid:
    - Displays products in a 3-column grid layout, with product images and names.
    - Dynamically loads products based on selected subcategory.
  
4. Dynamic Data Loading:
    - Uses Redux for managing state and fetching category details as the user interacts with categories and subcategories.

5. Scroll Management (Top and Bottom):
    - Detects when the user scrolls to the top or bottom of the list and automatically loads the previous or next category's products.

6. Responsive Layout:
    - The component adapts to different screen sizes with responsive layouts for product images and category names.

# Approach to Features

1. Category & Subcategory Navigation:
    - Approach: Horizontal FlatList components were used to display categories and subcategories. Tapping a category or subcategory updates the state, triggering a data fetch for the selected items.
    - Challenge: Ensuring that the selected category and subcategory were dynamically updated based on user interactions.
    - Resolution: Managed selected indices with useState and dynamically updated styles for active selections.

2. Product Grid Layout:
    - Approach: Products are displayed in a 3-column grid layout using the FlatList component with numColumns={3}. Each product has an image and a name.
    - Challenge: Ensuring the grid layout is responsive and that images load correctly without causing lag.
    - Resolution: Used dynamic image URLs and applied responsive styles for product items to accommodate different screen sizes.

3. Dynamic Data Loading:
    - Approach: Data is loaded dynamically from the Redux store using the loadCategoryDetails action when a category or subcategory is selected.
    - Challenge: Ensuring data loads seamlessly as the user switches between categories and subcategories.
    - Resolution: Implemented Redux for state management and dispatched actions to load category details upon selection.

4. Scroll Management (Top and Bottom):
    - Approach: Added functionality to detect when the user scrolls to the top or bottom. When this occurs, the app automatically loads the previous or next category's products.
    - Challenge: Avoiding repeated triggers when the user scrolls quickly.
    - Resolution: Used refs (scrollTopRef and scrollBottomRef) to limit the number of triggers and prevent rapid reloads.

5. Performance and Image Rendering:
    - Approach: Optimized image loading with resizeMode="cover" to ensure smooth rendering, and cached images to improve performance.
    - Challenge: Preventing lag when rendering product images and ensuring smooth scrolling.
    - Resolution: Implemented optimized image URLs and used React Native’s built-in image caching to handle performance efficiently.

# Challenges and Resolutions

1. Smooth Category and Subcategory Transition:
    - Challenge: Ensuring smooth transitions between categories and subcategories without causing UI glitches or lag.
    - Resolution: Managed transitions using FlatList components and handled state changes efficiently using Redux to avoid unnecessary rerenders.

2. Efficient Image Rendering:
    - Challenge: Loading multiple product images without causing performance issues, especially in large datasets.
    - Resolution: Leveraged resizeMode="cover" and optimized image URLs for faster loading and smooth rendering.

3. Scroll Management:
    - Challenge: Ensuring that category transitions happened smoothly when scrolling to the top or bottom, without triggering multiple reloads in quick succession.
    - Resolution: Used refs to manage the scroll state and prevent multiple triggers during fast scrolling.


# Testing Instructions

To test the features of the MarketDetailScreen component, follow the steps below:
1. Test Category Navigation:
    - Scroll horizontally through the list of categories.
    - Tap on different categories and verify that the associated subcategories and products update correctly.

2. Test Subcategory Navigation:
    - Scroll horizontally through the subcategories under the selected category.
    - Tap on different subcategories and ensure the product grid updates to display the correct products.

3. Test Product Grid:
    - Scroll vertically through the product grid.
    - Ensure that product images and names display correctly and that products are shown in a 3-column layout.

4. Test Scroll Behavior (Top and Bottom Detection):
    - Scroll to the top or bottom of the product list.
    - Verify that the previous or next category's products are automatically loaded when the user scrolls to the top or bottom.

5. Test Performance:
    - Scroll quickly through categories, subcategories, and products.
    - Ensure that there is no lag or janky scrolling during transitions.