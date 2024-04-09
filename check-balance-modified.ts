import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

const connection = new Connection("https://api.mainnet.solana.com", "confirmed");

const publicKey = new PublicKey(suppliedPublicKey);

(async () => {
  try {
    // Check if the supplied public key is valid
    if (!PublicKey.isOnCurve(suppliedPublicKey)) {
      throw new Error("Invalid public key provided!");
    }

    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
      `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL} SOL!`
    );
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
})();
