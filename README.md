# Inflow Export

Thanks to [inflow.finance](https://inflow.finance), a dope utility for aggregating my bank account spendings, this tool can now give me those spending in CSV format.

## How it'll work

Inflow saves the user's access token (JWT) in as a secure cookie, which can be obtained, and passed to this CLI tool via secure readline.

### CLI Design

```bash
inflow-export
> Provide your Access Token: ****
> What date range would you like to filter by? (Last 30 days)
- Last 30 Days
- All
- Custom
> Exported to /home/mykeels/Documents/inflow-2021-09-12-13-16.csv
```

### Usage

To install, run:

```bash
npm i -g inflow-export
```

To use, run:

```bash
inflow-export
```

and follow the prompts.

## Get your Access Token

- Login to your inflow finance via web browser
- Open the browser console (CTRL+SHIFT+I), and enter:

```js
(function () {
  function getCookie(name) {
    function escape(s) {
      return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
    }
    var match = document.cookie.match(
      RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
    );
    return match ? match[1] : null;
  }
  console.log(getCookie("__ACCESS_TOKEN__").replace(/\%22/g, ""));
})();

console.log("Copy the above Token 👆🏻");
```

## Legal Disclaimer

The author of this package is NOT liable for any misdemeanour on your bank accounts, or inflow finance accounts.

Enjoy!
