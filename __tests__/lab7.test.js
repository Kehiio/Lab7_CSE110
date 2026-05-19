describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  // // Clearing local storage to make clean slate before each test
  // beforeEach(async () => {
  //   await page.evaluate(() => localStorage.clear());
  //   await page.reload();
  //   await page.waitForSelector('product-item');
  // });


  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');

    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });

    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');

    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;

    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return data = item.data;
      });
    });

    
    for (let i = 0; i < prodItemsData.length; i++){
      //console.log(`Checking product item ${i}/${prodItemsData.length}`);
      value = prodItemsData[i];
      if (value.title.length == 0) { allArePopulated = false; }
      if (value.price.length == 0) { allArePopulated = false; }
      if (value.image.length == 0) { allArePopulated = false; }
    }

    expect(allArePopulated).toBe(true);

  }, 10000);



  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');

     const productItem = await page.$('product-item');

     const button = await page.evaluateHandle( 
      item => item.shadowRoot.querySelector('button'),
      productItem
     )

     await button.click();

     const buttonText = await page.evaluate(
      element => element.shadowRoot.querySelector('button').innerText,
      productItem
     )

     expect(buttonText).toBe('Remove from Cart');

  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');


    // First, clearing local storage and reloading pg bc last test pressed a button.
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('product-item');

    // Test code
    const productItems = await page.$$('product-item');
  
    // Add every item to cart
    for (const item of productItems) {
      await page.evaluate(
        elem => elem.shadowRoot.querySelector('button').click(),
        item
      );
    }

    const cartText = await page.$eval('#cart-count', elem => elem.innerText);

    expect(cartText).toBe('20');

  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    await page.reload();

    // Check all buttons say remove from cart
    const productItems = await page.$$('product-item');
  
    let allAddedToCart = true;
    for (const item of productItems) {
      const buttonText = await page.evaluate(
        elem => elem.shadowRoot.querySelector('button').innerText,
        item
      );
      
      if (buttonText != 'Remove from Cart'){
        allAddedToCart == false;
      }

    }

    expect(allAddedToCart).toBe(true);
    

  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {

    const cartItems = await page.evaluate(() => localStorage.getItem('cart'));

    console.log(cartItems);
    expect(cartItems).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');

    const productItems = await page.$$('product-item');
  
    // Click every item (should click to off)
    for (const item of productItems) {
      await page.evaluate(
        elem => elem.shadowRoot.querySelector('button').click(),
        item
      );
    }

    const cartText = await page.$eval('#cart-count', elem => elem.innerText);

    // should be 0
    expect(cartText).toBe('0');

  }, 10000);


  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    await page.reload();

    // Check all buttons say add to cart
    const productItems = await page.$$('product-item');
  
    let notinCart = true;
    for (const item of productItems) {
      const buttonText = await page.evaluate(
        elem => elem.shadowRoot.querySelector('button').innerText,
        item
      );
      
      if (buttonText != 'Add to Cart'){
        notinCart == false;
      }

    }

    expect(notinCart).toBe(true);

    // check cart count text
    const cartText = await page.$eval('#cart-count', elem => elem.innerText);

    expect(cartText).toBe('0');


  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

    const cartItems = await page.evaluate(() => localStorage.getItem('cart'));
    console.log(cartItems);

    expect(cartItems).toBe('[]');
  });


});


