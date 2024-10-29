const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Remplace par l'adresse de déploiement
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_initialPrice",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "buyToken",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "listToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listedForSale",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_tokenURI",
          "type": "string"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tokenOwners",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tokenPrices",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

async function initContract() {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        alert("Please install MetaMask!");
    }
}

async function connectWallet() {
    try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        document.getElementById("walletAddress").textContent = `Connected: ${accounts[0]}`;
    } catch (error) {
        console.error("Wallet connection error:", error);
    }
}

async function displayCats() {
    try {
        const contract = await initContract();
        for (let i = 0; i < 3; i++) {
            const uri = await contract.tokenURI(i);
            console.log(`Cat ${i} URI:`, uri); // Vérifie si l'URI s'affiche
            document.getElementById(`cat-${i}-uri`).textContent = uri;
        }
    } catch (error) {
        console.error("Error fetching URIs:", error);
    }
}



async function buyToken(tokenId) {
    try {
        const contract = await initContract();
        const price = await contract.initialPrice(); 
        console.log(`Buying Cat ${tokenId} at price:`, price.toString());
        await contract.buyToken(tokenId, { value: price });
        alert(`Bought Cat ${tokenId}!`);
        
        // Afficher le bouton de listage et le champ de prix
        document.querySelector(`.listButton[data-token-id="${tokenId}"]`).style.display = "inline";
        document.getElementById(`price-${tokenId}`).style.display = "inline";
    } catch (error) {
        console.error("Buy token error:", error);
    }
}

async function buyToken(tokenId) {
    try {
        const contract = await initContract();
        
        // Vérifier si le token est listé pour la vente
        const isListed = await contract.listedForSale(tokenId);
        if (!isListed) {
            alert("This token is not listed for sale.");
            return;
        }
        
        // Obtenir le prix du token
        const price = await contract.tokenPrices(tokenId);
        console.log(`Buying Cat ${tokenId} at price:`, price.toString());

        await contract.buyToken(tokenId, { value: price });
        alert(`Bought Cat ${tokenId}!`);
    } catch (error) {
        console.error("Buy token error:", error);
    }
}

// 
//     const contract = await initContract(); // Assure-toi que initContract() retourne bien l’instance du contrat
//     const signer = provider.getSigner();

//     try {
//         const tx = await contract.connect(signer).listToken(tokenId, ethers.utils.parseEther(price.toString()));
//         await tx.wait();
//         console.log(`Token ${tokenId} listed for ${price} wei`);
//     } catch (error) {
//         console.error("Error listing token:", error);
//     }
// }

async function listToken(tokenId) {
    const contract = await initContract();
    const priceInput = document.getElementById(`price-${tokenId}`);
    const price = priceInput.value; // Récupérer le prix depuis le champ de saisie

    if (!price || isNaN(price)) {
        alert("Please enter a valid price.");
        return;
    }

    try {
        const tx = await contract.listToken(tokenId, ethers.utils.parseUnits(price, "wei"));
        await tx.wait();
        alert(`Token ${tokenId} listed for sale at ${price} wei.`);
    } catch (error) {
        console.error("Error listing token:", error);
    }
}


// async function listToken(tokenId) {
//     const contract = await initContract();
//     const priceInput = document.getElementById(`price-${tokenId}`);
//     const price = priceInput.value;
//     try {
//         await contract.listToken(tokenId, price);
//         alert(`Cat ${tokenId} listed for sale at ${price} wei!`);
//     } catch (error) {
//         console.error("List token error:", error);
//     }
// }



// Écouteurs d'événements pour les boutons
document.getElementById("connectWallet").addEventListener("click", connectWallet);

// document.querySelectorAll(".buyButton").forEach(button => {
//     button.addEventListener("click", (event) => {
//         const tokenId = event.target.getAttribute("data-token-id");
//         buyToken(tokenId);
//     });
// });

// document.querySelectorAll(".listButton").forEach(button => {
//     button.addEventListener("click", (event) => {
//         const tokenId = event.target.getAttribute("data-token-id");
//         listToken(tokenId);
//     });
// });

document.querySelectorAll(".buyButton").forEach(button => {
    button.addEventListener("click", (event) => {
        const tokenId = event.target.getAttribute("data-token-id");
        buyToken(tokenId);
    });
});

document.querySelectorAll(".listButton").forEach(button => {
    button.addEventListener("click", (event) => {
        const tokenId = event.target.getAttribute("data-token-id");
        listToken(tokenId);
    });
});

// Afficher les chats au chargement de la page
displayCats();
