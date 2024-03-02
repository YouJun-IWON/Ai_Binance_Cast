import { metamaskWallet, injectedMetamaskProvider } from "thirdweb/wallets";

export async function connectToMetamask() {
  let address = null;
  const isInstalled = !!injectedMetamaskProvider();
  // if metamask extension is installed, connect to MetaMask extension
  if (isInstalled) {
    // create an instance
    const wallet = metamaskWallet();
    try {
      const account = await wallet.connect(); // connect to it
      console.log("connected to", account);
      address = account.address;
    } catch (e) {
      console.error("error connecting to metamask", e);
    }
  }

  // else prompt user to connect to MetaMask wallet app by scanning a QR code
  else {
    console.log("Wallet connection failed!!!");
  }
  return address;
}
