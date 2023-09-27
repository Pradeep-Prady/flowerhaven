import React from "react";
import { Link } from "react-router-dom";

export default function CheckOut({ shipping, confirmOrder, payment }) {
  return (
    <>
      <div className="flex items-center justify-center gap-5 my-5">
        {shipping ? (
          <Link>
            <div>
              <button className="btn">
                Shipping Info <i class="fa-solid fa-circle-chevron-right"></i>{" "}
              </button>
            </div>
          </Link>
        ) : (
          <Link>
            <div>
              <button className="btn-out">
                Shipping Info <i class="fa-solid fa-circle-chevron-right"></i>{" "}
              </button>
            </div>
          </Link>
        )}

        {confirmOrder ? (
          <Link>
            <div>
              <button className="btn">
                Confirm Order <i class="fa-solid fa-circle-chevron-right"></i>{" "}
              </button>
            </div>
          </Link>
        ) : (
          <Link>
            <div>
              <button className="btn-out">
                Confirm Order <i class="fa-solid fa-circle-chevron-right"></i>{" "}
              </button>
            </div>
          </Link>
        )}

        {payment ? (
          <Link>
            <div>
              <button className="btn">
                Payment <i class="fa-solid fa-circle-chevron-right"></i>{" "}
              </button>
            </div>
          </Link>
        ) : (
          <Link>
            <div>
              <button className="btn-out">
                Payment <i class="fa-solid fa-circle-chevron-right"></i>{" "}
              </button>
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
