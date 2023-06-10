import { expect } from "chai";
import { ethers } from "hardhat";
import { Artwork } from "../typechain-types";

describe("Artwork Smart Contract Tests", function () {
    let artwork: Artwork;

    this.beforeEach(async function () {
        // This is executed before each test
        // Deploying the smart contract
        const Artwork = await ethers.getContractFactory("Artwork");
        artwork = await Artwork.deploy("Artwork Contract", "ART");
    })

    it("NFT is minted successfully", async function () {
        let account1;
        [account1] = await ethers.getSigners();

        expect(await artwork.balanceOf(account1.address)).to.equal(0);

        const tokenURI = "https://kongz.herokuapp.com/api/metadata/1"
        const tx = await artwork.connect(account1).mint(tokenURI);

        expect(await artwork.balanceOf(account1.address)).to.equal(1);
    })

    it("tokenURI is set successfully", async function () {
        let account1;
        let account2;
        [account1, account2] = await ethers.getSigners();

        const tokenURI_1 = "https://kongz.herokuapp.com/api/metadata/1"
        const tokenURI_2 = "https://kongz.herokuapp.com/api/metadata/2"

        const tx1 = await artwork.connect(account1).mint(tokenURI_1);
        const tx2 = await artwork.connect(account2).mint(tokenURI_2);

        expect(await artwork.tokenURI(0)).to.equal(tokenURI_1);
        expect(await artwork.tokenURI(1)).to.equal(tokenURI_2);

    })
});
