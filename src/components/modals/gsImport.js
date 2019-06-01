import React from "react";
import icons from "./../../assets/icons/index";
import { withContext } from "./../../provider/index";
import Api from "./../../utils/api/index";

export default withContext(({ Ref, ctx }) => {
  let btnText, disabled;
  if (ctx.loading) {
    btnText = "Importing...";
    disabled = true;
  } else {
    btnText = "Import ↓";
  }
  return (
    <div ref={Ref} className="board shadowize gs-modal">
      <img src={icons.googleSheet} alt="google-sheet" />
      <div>
        <div>Import from Google Sheets</div>
        <div>Import addresses with Google sheet URL</div>
        <input
          value={ctx.url}
          name="url"
          onChange={e => ctx.handleChange(e.target.name, e.target.value)}
          placeholder="Google sheet URL..."
        />
        <div>
          <button
            disabled={disabled}
            onClick={e => {
              e.preventDefault();
              if (ctx.url) {
                const url = ctx;
                ctx.handleChange("loading", true);
                Api.getFromGSheet(url).then(res => {
                  if (res.addresses && res.amounts) {
                    ctx.handleChange("addresses", res.addresses);
                    ctx.handleChange("amounts", res.amounts);
                  }else{
                    console.log(res)
                    ctx.handleChange("errorMessage", "Cannot find 'ADDRESSES' and 'AMOUNTS' column in the google sheet.")
                    ctx.handleChange("modalName", "error")
                  }
                  ctx.handleChange("url", "");
                  ctx.handleChange("loading", false);
                }).catch(err => console.log(err.message));
              }
            }}
            className="ms-btn"
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
});
