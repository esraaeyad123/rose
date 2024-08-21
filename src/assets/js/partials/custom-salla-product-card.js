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
      <div class="duration-200 hover:-translate-y-3 parent pb-4">

      <div class="product">
        <div class="p-relative">
        
          <div class="product-block__thumb ">
            ${this.product.promotion_title
              ? `<span class="badge badge--ribbon badge--primary">
              ${this.product.promotion_title}</span>`
              : this.showQuantity && this.product.quantity
                ? `<span class="badge badge--ribbon badge--primary">${remained} ${this.product.quantity}</span>`
                : this.showQuantity && this.product.is_out_of_stock
                  ? `<div class="out-badge ${this.horizontal ? '' : 'max-w-[calc(100%-60px)]'}">${outOfStock}</div>`
                  : ''
            }
            
                <a href="${this.product.url}" class="thumb-wrapper" aria-label="${this.product.name}">
                  <img class="lazy-load" width="200" height="200" src="${this.product.image.url
                  }" data-src="${this.product.image.url
              }" alt="${this.product.image.alt}" />
                    </a>

                 
                  </div>
        </div>
          <div class="relative wide donating-wrap">
            <div class="product-block__info ">
        
            <div class="product-main-info ">


            <div class="product-title-section">
              <a href="${this.product.url}" class="product-title">
                <h2 class="text-lg text-center opacity-95 truncate font-semibold ">${this.product.name ? this.product.name :  ''}</h2>
                ${!!this.product.subtitle ? `<p>` +  this.product.subtitle + `</p>` : `<p class="mt-8"></p>`}
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
                    <input placeholder="${donationPH}"
                          type="text"
                          id="donation_amount_${this.product.id}"
                          name="donation_amount"
                          class="form-control form-control--short _parseArabicNumbers"
                          value="${salla.url.is_page('cart') ? this.product.price : ''}"
                          data-digits-with-decimal
                          data-digits
                          ${!this.product.can_donate ? 'disabled' : ''} />
                    <span class="input-group-addon"> ${salla.config.currency().symbol} </span>
                  </div>
                </div>
              </div>`
        : ''
      }
        <div class="price-wrapper s-product-card-sale-price ">
              ${this.product.is_on_sale ?
                `<span class="text-sm">${salla.money(this.product.regular_price)}</span>
                <h4 class="total-price text-red-400 font-bold text-xl inline-block ">${salla.money(this.product.sale_price)}</h4>` :
                `<span></span><h4 class="total-price text-black font-bold text-xl inline-block mt-5">${salla.money(this.product.price)}</h4>`
              }
           </div>
      
        <div class="product-bottom-details px-6 py-2 text-center">
            


    

          ${!this.hideAddBtn ?
          `
          
          <div class="flex items-center w-full gap-2 add-button-preview ${this.product.status == 'out' ? 'disabled' : ''}">
                    <salla-add-product-button
                        class="btn--add-product w-full  flex gap-2 justify-center items-center pt-2 pb-[10px] px-8 rounded-lg  "
                        product-id="${this.product.id}"
                        product-status="${this.product.status}"
                        product-type="${this.product.type}">
                        ${this.product.type == 'booking' ? '<i class="sicon-calendar-date"></i>' : '<i class="sicon-add"></i>'}
                        <span class="s-button-text"><span>إضافة للسلة</span></span>
                        
                    </g>
                </svg>
                    </salla-add-product-button>
                   

                      `
            : ''
          }


          ${this.showWishlist
                    
            ?  
            `
          <div class="product-card-btn--wishlist xxxs:hidden xxs:hidden sm:hidden md:flex ">
                  <salla-button loader-position="center" shape="icon" size="small" color="danger" class="btn--delete"
                  <span class="s-button-text">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                </svg>
              </span>
                  </salla-button>
                  
                </div>`
        : `<div class="product-card-btn--wishlist xxxs:hidden xxs:hidden sm:hidden md:flex">
        <salla-button  loader-position="center" shape="icon" size="small" color="danger" class="btn--delete"
        onclick="salla.wishlist.add(${this.product.id})">
        <span class="s-button-text">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                </svg>
              </span>
        </salla-button>
        
      </div>
        
     </div> 
      `
      }
      </div>
      </div>
        </div> 
            `;
      document.lazyLoadInstance?.update(document.querySelectorAll('.product-block__thumb .lazy-load'));
    }
    
    
    

  }
  
  customElements.define('custom-salla-product-card', ProductCard);