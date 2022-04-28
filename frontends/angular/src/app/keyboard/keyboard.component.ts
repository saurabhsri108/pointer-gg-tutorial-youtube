import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ethers } from 'ethers';
import contract from '../Keyboard.json';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: [],
})
export class KeyboardComponent implements OnInit {
	@Input() kind: number = 0;
	@Input() type: string = '';
	@Input() filter: string = '';
	@Input() owner: string = '';
	@Input() preview: boolean = false;
	@Input() currentOwner: string = '';
	@Input() ethereum: any;
	@Input() index: number | undefined;

	public isTipping: boolean = false;
	public alt: string = '';
	public imagePath: string = '';
	public style: string = '';

	readonly CONTRACT_ADDRESS: string = '0xD76780E312cAb4202E9F8E66a04e76CBea886D07';
	public contractABI = contract.abi;

	constructor() {}

	ngOnInit(): void {
		this.displayImage();
	}

	displayImage() {
		const kindDir = this.getKindDir(this.kind);
		const filename = this.type;
		this.imagePath = `assets/keyboards/${kindDir}/${filename}.png`;
		this.alt = `${kindDir} keyboard with ${filename} keys ${
			this.filter
				? `with
${this.filter}`
				: ''
		}`;
		this.style = this.filter;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['kind']) {
			this.kind = changes['kind'].currentValue;
		}
		if (changes['type']) {
			this.type = changes['type'].currentValue;
		}
		if (changes['filter']) {
			this.filter = changes['filter'].currentValue;
		}
		this.displayImage();
	}

	getKindDir(kind: number) {
		return {
			0: 'sixty-percent',
			1: 'seventy-five-percent',
			2: 'eighty-percent',
			3: 'iso-105',
		}[kind];
	}

	async tip() {
		if (!this.ethereum) {
			console.error('Ethereum object is required to submit a tip');
			return;
		}
		this.isTipping = true;
		try {
			const provider = new ethers.providers.Web3Provider(this.ethereum);
			const signer = provider.getSigner();
			const keyboardsContract = new ethers.Contract(this.CONTRACT_ADDRESS, this.contractABI, signer);
			const tipTxn = await keyboardsContract['tip'](this.index, { value: ethers.utils.parseEther('0.01') });
			await tipTxn.wait();
			console.log('Sent tip!', tipTxn.hash);
		} catch (err: any) {
			console.error(err.message);
		} finally {
			this.isTipping = false;
		}
	}
}
