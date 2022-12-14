import css from 'styled-jsx/css'

export default css`
  /* @import url('https://use.typekit.net/vib8pxz.css'); */
  .elementor-column {
    display: flex;
    width: 100%;
    min-width: 50%;
    max-width: 100;
    height: 100%;
    .elementor-column-wrapper {
      width: 100%;
      display: flex;
      .woocommerce {
        width: 100%;
        .products {
          /* important */
          margin-top: 2rem;
          /* important */
          padding-left: 0;

          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;

          .product-wrapper {
            display: block;
            text-align: center;
            padding: 10px;
            flex: 25%;
            max-width: 25%;

            .product {
              box-shadow: 0px 0px 10px -8px rgb(0 0 0 / 50%);
              border: 1px solid #efefef;
              border-radius: 15px;
              cursor: pointer;
              transition: all 0.2s ease-in-out;
              padding: 20px;

              &:hover {
                box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
              }
            }

            .product-img {
            }
            .product-detail {
              width: 100%;
              text-align: center;
              font-family: 'Montserrat', sans-serif;
              font-weight: 600;
              .product-category {
                color: #222;
                font-size: 0.85rem;
                margin-bottom: 0.5rem;
                display: block;
                line-height: 1.3;
                opacity: 0.6;
              }
              .product-link {
                color: #333;
                text-decoration: none;

                padding: 0;
                font-size: 0.7rem;
                h2 {
                  /* overflow: hidden; */
                  /* text-overflow: ellipsis; */
                  /* white-space: nowrap; */
                  margin: 0;
                  margin-bottom: 8px;
                }
              }
              .price {
                width: 100%;
                font-size: 18px;
                font-weight: 700;
                color: #273172;
                margin-bottom: 0.5rem;
                cursor: text;
                span {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
`
