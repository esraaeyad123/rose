const axios = require('axios');

class ProductCard extends HTMLElement {

    constructor() {
      super();
      this.isInitialized = false;
    }
  
    connectedCallback() {
      if (this.isInitialized) {
        return;
      }
      
      // Setting props
      this.horizontal = this.getAttribute('horizontal') === 'true';
      this.showWishlist = this.getAttribute('show-wishlist') === 'true';
      this.is_special = this.getAttribute('product-entry--special') === 'true';
      this.product = this.product || JSON.parse(this.getAttribute('product'));  // Assuming 'product' attribute is a JSON string

  
      // Append host classes and id
      this.classList.add('product-block');
      this.id = `product_${this.product.id}`
      if (this.product.is_out_of_stock) {
        this.classList.add('is-out', 's-product-card-entry', 's-product-card-entry', 's-product-card-vertical', 'hydrated');
      }

      // Wait until the Salla library has fully loaded before initializing and rendering the component
      salla.onReady(() => {
        // Add fit type class
        let fitType = salla.config.get('store.settings.product.fit_type')
        if (!!fitType) {
          this.classList.add(`${fitType}`)
        }
  
        // The element is ready for rendering now
        this.render();
        
        // Check if translations are loaded, if not then load them and re-render
        if (!salla.lang.translationsLoaded) {
          salla.lang.onLoaded(() => this.render());
        }
      });

      
    }
    onReady(){
      salla.lang.translationsLoaded || salla.lang.onLoaded(() => {this.render()});
    }
    render() {
      // Handle landing page
      this.source = salla.config.get('page.slug');
      if (this.source == 'landing-page') {
        this.hideAddBtn = true;
        this.showQuantity = true;
      }
  
      // Translations
      const remained = salla.lang.get('pages.products.remained');
      const donationPH = salla.lang.get('pages.products.donation_placeholder');
      const startingPrice = salla.lang.get('pages.products.starting_price');
      const outOfStock = salla.lang.get('pages.products.out_of_stock');
      const calories = salla.lang.get('pages.products.calories');

      if(this.product.quantity) {
      }else {
        if (this.product.is_out_of_stock) {
          this.product.discount_ends = null;
        }
        
      }
      this.innerHTML = `
<div class="product duration-200 hover:-translate-y-3 parent pb-4 h-auto  
    animate-fade animate-duration-1000 relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg h-full justify-between">
    
    <div class="p-relative">
        <div class="product-block__thumb flex overflow-hidden relative mt-3 mx-2 rounded-xl">
            <div class="save absolute left-3">
                ${this.showWishlist
                    ? `
                    <button loader-position="center" shape="icon" size="small" class="" onclick="salla.wishlist.remove(${this.product.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" class="w-6 h-6 justify-center save">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                        </svg>
                    </button>
                    `
                    : `
                    <button loader-position="center" shape="icon" size="small" class="" onclick="salla.wishlist.add(${this.product.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" class="w-6 h-6 justify-center save">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                        </svg>
                    </button>
                    `}
            </div>
            
            ${this.product.promotion_title
                ? `
                <span class="absolute top-3 right-3">
                    <span class="text-xs w-fit block px-3 font-thin py-1 my-2 bg-gray-100 rounded-md">
                        ${this.product.promotion_title}
                    </span>
                </span>`
                : this.showQuantity && this.product.quantity
                    ? `<span class="badge badge--ribbon badge--primary">${remained} ${this.product.quantity}</span>`
                    : this.showQuantity && this.product.is_out_of_stock
                        ? `<div class="out-badge ${this.horizontal ? '' : 'max-w-[calc(100%-60px)]'}">${outOfStock}</div>`
                        : ''
            }
            
            <a class="mx-2 mt-3 flex overflow-hidden rounded-xl" href="${this.product.url}" aria-label="${this.product.name}">
    <img class="object-cover w-full h-auto" width="200" height="auto" src="${this.product.image.url}" data-src="${this.product.image.url}" alt="${this.product.image.alt}" />
</a>

        </div>
    </div>
    
    <div class="relative wide donating-wrap">
        <div class="product-block__info">
            <div class="product-main-info">
                <div class="product-title-section">
                    <a href="${this.product.url}" class="product-title">
                        <h2 class="text-lg text-center opacity-95 truncate font-semibold ">${this.product.name ? this.product.name : ''}</h2>
                        ${!!this.product.subtitle ? `<p class="text-center">${this.product.subtitle}</p>` : `<p class="mt-4 text-center opacity-95 truncate font-semibold"></p>`}
                    </a>
                </div>
            </div>
            
            ${this.product.calories
                ? `<div class="font-sm mt-5 mb-10">
                    <i class="d-inline-block sicon-fire color-danger mr-1 ml-0"></i>
                    <strong>${this.product.calories}</strong> ${calories}
                </div>`
                : ''
            }
        </div>
        
        ${this.product.is_donation ?
            `{% component 'product.donation-progress-bar' with {'product': product, 'is_cart': is_cart} %}
            <div class="form mt-2 mb-2">
                <div class="form-group">
                    {{ csrf_field() }}
                    <div class="input-group input-group--end">
                        <input placeholder="${donationPH}" type="text" id="donation_amount_${this.product.id}" name="donation_amount" class="form-control form-control--short _parseArabicNumbers" value="${salla.url.is_page('cart') ? this.product.price : ''}" data-digits-with-decimal data-digits ${!this.product.can_donate ? 'disabled' : ''} />
                        <span class="input-group-addon"> ${salla.config.currency().symbol} </span>
                    </div>
                </div>
            </div>`
            : ''
        }
        
        <div class="price-wrapper s-product-card-sale-price mt-1 mb-3 w-full text-center items-center">
            ${this.product.is_on_sale ?
                `<span class="text-sm">${salla.money(this.product.regular_price)}</span>
                <h4 class="total-price text-red-400 font-bold text-xl inline-block ">${salla.money(this.product.sale_price)}</h4>` :
                `<span></span><h4 class="total-price text-black font-bold text-xl inline-block mt-5">${salla.money(this.product.price)}</h4>`
            }
        </div>

        <div class="flex px-6 py-2 text-center h-min justify-between mt-2">
            ${!this.hideAddBtn ?
                `
                <div class="flex w-full add-button-preview ${this.product.status == 'out' ? 'disabled' : ''}">
    <salla-add-product-button class="button-add" shape="btn" color="primary" fill="none" size="medium" width="wide" type="button"
        product-id="${this.product.id}"
        product-status="${this.product.status}"
        product-type="${this.product.type}">
        
        <div class="flex flex-col justify-between h-min w-full">
           <button class="
    bg-[var(--color-primary)] 
    font-bold 
    text-white 
    cursor-pointer 
    tracking-normal  
    md:text-[20px] 
    text-[17px] 
    flex 
    gap-2 
    justify-center 
    items-center 
    shadow 
    rounded-[0.25rem] 
    h-10 
    w-full 
    py-2 
    px-2
    duration-100
      
    "
    type="button" 
    aria-label="Add product to cart">
    <span class="flex items-center">اضف للسلة</span>
    <svg id="add-to-cart-icon" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" color="currentColor">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M3.977 9.84A2 2 0 0 1 5.971 8h12.058a2 2 0 0 1 1.994 1.84l.803 10A2 2 0 0 1 18.833 22H5.167a2 2 0 0 1-1.993-2.16l.803-10Z"></path>
            <path d="M16 11V6a4 4 0 0 0-4-4v0a4 4 0 0 0-4 4v5"></path>
        </g>
    </svg>
   
</button>

        </div>
       
    </salla-add-product-button>
</div>

`
                : ''
            }
        </div>
    </div>
</div>

      
            `;
      document.lazyLoadInstance?.update(document.querySelectorAll('.product-block__thumb .lazy-load'));
    }
    
    
    

  }
  
  customElements.define('custom-salla-product-card', ProductCard);




