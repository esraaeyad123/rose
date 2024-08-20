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
      this.id = product_${this.product.id}
      if (this.product.is_out_of_stock) {
        this.classList.add('is-out', 's-product-card-entry', 's-product-card-entry', 's-product-card-vertical', 'hydrated');
      }

      // Wait until the Salla library has fully loaded before initializing and rendering the component
      salla.onReady(() => {
        // Add fit type class
        let fitType = salla.config.get('store.settings.product.fit_type')
        if (!!fitType) {
          this.classList.add(${fitType})
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
      <div class="product">
        <div class="p-relative">
        
          <div class="product-block__thumb ">
            ${this.product.promotion_title
              ? <span class="badge badge--ribbon badge--primary">${this.product.promotion_title}</span>
              : this.showQuantity && this.product.quantity
                ? <span class="badge badge--ribbon badge--primary">${remained} ${this.product.quantity}</span>
                : this.showQuantity && this.product.is_out_of_stock
                  ? <div class="out-badge ${this.horizontal ? '' : 'max-w-[calc(100%-60px)]'}">${outOfStock}</div>
                  : ''
            }
            
                <a href="${this.product.url}" class="thumb-wrapper" aria-label="${this.product.name}">
                  <img class="lazy-load" width="200" height="200" src="${this.product.image.url
                  }" data-src="${this.product.image.url
              }" alt="${this.product.image.alt}" />
                    </a>
                  </div>
            
                  ${this.showWishlist
                ? `<span class="btn--product-like">
                          <salla-button loader-position="center" shape="icon" size="small" color="danger" class="btn--delete" onclick="salla.wishlist.remove(${this.product.id})">
                              <?xml version="1.0" encoding="utf-8"?>
                              <!-- Generator: Adobe Illustrator 27.8.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="290" height="293" viewBox="0 0 290 293">
  <defs>
    <filter id="Path_1" x="3" y="5" width="134.219" height="134.219" filterUnits="userSpaceOnUse">
      <feOffset dx="1" dy="1" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feFlood/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="Path_2" x="154.364" y="5" width="134.219" height="134.219" filterUnits="userSpaceOnUse">
      <feOffset dx="1" dy="1" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="4" result="blur-2"/>
      <feFlood/>
      <feComposite operator="in" in2="blur-2"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="Path_3" x="165.972" y="168.03" width="122.611" height="122.611" filterUnits="userSpaceOnUse">
      <feOffset dx="1" dy="1" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="4" result="blur-3"/>
      <feFlood/>
      <feComposite operator="in" in2="blur-3"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="Path_4" x="3" y="156.364" width="134.219" height="134.276" filterUnits="userSpaceOnUse">
      <feOffset dx="1" dy="1" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="4" result="blur-4"/>
      <feFlood/>
      <feComposite operator="in" in2="blur-4"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <clipPath id="clip-p-v_rouh">
      <rect width="290" height="293"/>
    </clipPath>
  </defs>
  <g id="p-v_rouh" data-name="p-v rouh" clip-path="url(#clip-p-v_rouh)">
    <g id="vuesax_linear_maximize-2" data-name="vuesax linear maximize-2" transform="translate(13.95 15.95)">
      <g transform="matrix(1, 0, 0, 1, -13.95, -15.95)" filter="url(#Path_1)">
        <path id="Path_1-2" data-name="Path 1" d="M14.416,110.269A14.372,14.372,0,0,1,.05,95.9V66.768A66.61,66.61,0,0,1,66.653.05H95.9a14.366,14.366,0,0,1,0,28.733H66.768A37.965,37.965,0,0,0,28.725,66.768V95.9a14.372,14.372,0,0,1-14.366,14.366Z" transform="translate(13.95 15.95)" fill="#fff"/>
      </g>
      <g transform="matrix(1, 0, 0, 1, -13.95, -15.95)" filter="url(#Path_2)">
        <path id="Path_2-2" data-name="Path 2" d="M122.243,110.269A14.372,14.372,0,0,1,107.876,95.9V66.768A37.965,37.965,0,0,0,69.949,28.725H40.756a14.338,14.338,0,1,1,0-28.675H69.949a66.708,66.708,0,0,1,66.66,66.6V95.9A14.372,14.372,0,0,1,122.243,110.269Z" transform="translate(138.97 15.95)" fill="#fff"/>
      </g>
      <g transform="matrix(1, 0, 0, 1, -13.95, -15.95)" filter="url(#Path_3)">
        <path id="Path_3-2" data-name="Path 3" d="M60.418,127.031H42.776a14.366,14.366,0,1,1,0-28.733h17.47A38.038,38.038,0,0,0,98.288,60.313V42.786a14.366,14.366,0,1,1,28.733,0v17.47A66.794,66.794,0,0,1,60.418,127.031Z" transform="translate(148.56 150.61)" fill="#fff"/>
      </g>
      <g transform="matrix(1, 0, 0, 1, -13.95, -15.95)" filter="url(#Path_4)">
        <path id="Path_4-2" data-name="Path 4" d="M66.71,136.609A66.708,66.708,0,0,1,.05,70.006V40.756a14.366,14.366,0,0,1,28.733,0V69.891A38.026,38.026,0,0,0,66.71,107.934H95.9a14.366,14.366,0,1,1,0,28.733H66.71Z" transform="translate(13.95 140.97)" fill="#fff"/>
      </g>
    </g>
  </g>
</svg>
                          </salla-button>
                          
                        </span>`
                : `<span class="btn--product-like">
                <salla-button loader-position="center" shape="icon" class="btn--delete" onclick="salla.wishlist.add(${this.product.id})">
                    <?xml version="1.0" encoding="utf-8"?>
                    <!-- Generator: Adobe Illustrator 27.8.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                    <svg class="wishlist-icon-product" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 137.52 124.56">
                    <g class="cls-1">
                      <g id="Layer_1" data-name="Layer 1">
                        <g id="Path_88" data-name="Path 88">
                          <image class="cls-4" width="573" height="519" transform="scale(.24)" xlink:href="https://cdn.salla.sa/form-builder/RvU2R3q33h8JPUiqq73kHeLUeCzGwdLshrRQweqh.png" />
                          <g>
                            <path class="cls-3" d="M65.73,106.34c-1.47,0-2.94-.22-4.37-.63-19.09-6.36-49.09-28.79-49.09-62.14.39-17.49,14.65-31.39,31.96-31.39h.7c7.81.18,15.14,3.13,20.8,8.28,5.84-5.25,13.55-8.28,21.5-8.28h.41c8.26,0,16.12,3.21,22.09,9.05,6.03,5.91,9.4,13.83,9.48,22.28,0,33.43-30,55.85-48.92,62.14-.06.02-.12.04-.18.06-1.43.41-2.9.63-4.37.63h-.02ZM68.74,101.02h0ZM44.23,22c-12,0-21.91,9.63-22.17,21.7,0,31.49,31.25,49.03,42.22,52.7.86.25,1.98.25,3.04-.04,11.04-3.72,42.1-21.23,42.12-52.76-.06-5.8-2.39-11.26-6.54-15.35-4.17-4.09-9.75-6.31-15.51-6.25h-.06c-6.93,0-13.51,3.25-17.68,8.69-.92,1.21-2.37,1.92-3.9,1.92h0c-1.53,0-2.96-.7-3.88-1.92-4.11-5.37-10.36-8.54-17.12-8.68h-.49l-.04-.02Z"></path>
                            <path class="cls-2" d="M65.75,106.42h-.02c-1.46,0-2.94-.21-4.39-.63-11.03-3.68-22.9-11.52-31.74-20.97-7.94-8.49-17.41-22.54-17.41-41.24.19-8.47,3.62-16.39,9.66-22.31,6.03-5.91,13.97-9.16,22.38-9.16h.71c7.73.17,15.11,3.11,20.8,8.26,5.95-5.33,13.58-8.26,21.5-8.26h.41c8.29,0,16.16,3.22,22.14,9.07,6.05,5.93,9.42,13.86,9.5,22.34,0,33.46-30.04,55.92-48.97,62.21l-.18.06c-1.46.42-2.93.63-4.39.63ZM44.93,12.26h-.7c-8.36,0-16.27,3.24-22.27,9.12-6.01,5.89-9.42,13.77-9.61,22.2,0,18.65,9.44,32.66,17.37,41.13,8.83,9.44,20.67,17.26,31.68,20.93,1.44.41,2.9.62,4.34.62h.02c1.45,0,2.91-.21,4.35-.62l.17-.06c18.89-6.28,48.87-28.68,48.87-62.06-.08-8.43-3.44-16.33-9.46-22.23-5.96-5.82-13.78-9.03-22.04-9.03h-.41c-7.91,0-15.53,2.93-21.45,8.26l-.05.05-.05-.05c-5.66-5.16-13.03-8.09-20.75-8.26ZM65.67,96.66c-.5,0-.98-.06-1.41-.19-10.97-3.66-42.27-21.22-42.27-52.77.12-5.85,2.5-11.33,6.7-15.43,4.19-4.09,9.71-6.35,15.54-6.35h.03s.02.02.02.02h.47c6.78.14,13.04,3.31,17.17,8.71.91,1.2,2.3,1.89,3.82,1.89s2.94-.71,3.84-1.89c4.19-5.46,10.82-8.72,17.74-8.72h.06c.08,0,.15,0,.23,0,5.77,0,11.21,2.22,15.33,6.27,4.17,4.11,6.5,9.59,6.56,15.41,0,7.33-1.7,14.41-5.04,21.06-2.83,5.62-6.83,10.94-11.9,15.81-8.85,8.49-19.12,13.91-25.22,15.97-.55.15-1.12.23-1.67.23ZM44.21,22.08c-5.79,0-11.26,2.24-15.42,6.3-4.17,4.07-6.53,9.51-6.66,15.32,0,31.46,31.23,48.97,42.17,52.62.88.26,1.97.24,2.99-.04,6.09-2.05,16.33-7.46,25.16-15.93,5.06-4.86,9.05-10.16,11.88-15.76,3.33-6.62,5.02-13.68,5.03-20.99-.06-5.78-2.37-11.21-6.52-15.3-4.15-4.07-9.65-6.28-15.46-6.23h-.06c-6.88,0-13.47,3.24-17.62,8.67-.93,1.22-2.41,1.95-3.96,1.95s-3-.71-3.94-1.95c-4.11-5.36-10.32-8.51-17.06-8.65h-.52s-.02-.02-.02-.02Z"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </salla-button>
                
              </span>`
              }

        </div>
          <div class="relative wide donating-wrap">
            <div class="product-block__info">
            
            <div class="counter-section">
            ${this.product.quantity
              ? `<div class="product-quantity-card flash-deals-hide product-quantity-card-available">
                   <div class="trans-words">
                     <div>${this.product.quantity}</div>
                     <div></div>
                   </div>
                 </div>`
              : this.product.is_out_of_stock
                ? `<div class="product-quantity-card flash-deals-hide product-quantity-card-unavailable">
                     <div class="trans-words">
                       <div></div>
                       <div></div>
                     </div>
                   </div>`
                : 
                `<div class="product-quantity-card flash-deals-hide product-quantity-card-available product-quantity-card-available-uncountable">
                   <div class="trans-words">
                     <div></div>
                     <div></div>
                   </div>
                 </div>`
            }              
            </div>
            
            <div class="product-main-info">
            <div class="product-title-section">
              <a href="${this.product.url}" class="product-title">
                <h2 class="title title--primary title--small">${this.product.name ? this.product.name :  ''}</h2>
                ${!!this.product.subtitle ? <p> +  this.product.subtitle + </p> : <p class="mt-8"></p>}
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
              <div class="form mt-10 mb-10">
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
        <div class="card-footer">
            <div class="price-wrapper s-product-card-sale-price">
              ${this.product.is_on_sale ?
                `<span>${salla.money(this.product.regular_price)}</span>
                <h4 class="total-price text-red-400 font-bold text-xl inline-block ">${salla.money(this.product.sale_price)}</h4>` :
                `<span></span><h4 class="total-price text-black font-bold text-xl inline-block mt-5">${salla.money(this.product.price)}</h4>`
              }
           </div>

    

          ${!this.hideAddBtn ?
          `<div class="btn btn--floated btn--add-to-cart btn--add-to-cart add-button-preview ${this.product.status == 'out' ? 'disabled' : ''}">
                    <salla-add-product-button
                        product-id="${this.product.id}"
                        product-status="${this.product.status}"
                        product-type="${this.product.type}">
                        ${this.product.type == 'booking' ? '<i class="sicon-calendar-date"></i>' : '<i class="sicon-add"></i>'}
                    </salla-add-product-button>
                   

                      </div>`
            : ''
          }
      </div>
      </div>
         
            `

      document.lazyLoadInstance?.update(document.querySelectorAll('.product-block__thumb .lazy-load'));
    }
    
   
    
    
    

  }
  
  customElements.define('custom-salla-product-card', ProductCard);