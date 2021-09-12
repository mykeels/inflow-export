# Inflow Export

Thanks to [inflow.finance](https://inflow.finance), a dope utility for aggregating my bank account spendings, this tool can now give me those spending in CSV format.

## How it'll work

Inflow saves the user's access token (JWT) in as a secure cookie, which can be obtained, and passed to this CLI tool via secure readline.

### CLI Design

```bash
inflow-export
> Provide your Access Token: ****
> Exported to /home/mykeels/Documents/inflow-2021-09-12-13-16.csv
```
