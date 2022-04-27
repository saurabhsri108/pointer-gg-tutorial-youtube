//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Keyboard {
    enum KeyboardKind {
        SixtyPercent,
        SeventyFivePercent,
        EightyPercent,
        Iso105
    }

    struct _Keyboard {
        KeyboardKind kind;
        // ABS = false, PBT = true
        bool isPBT;
        string filter;
        address owner;
    }

    _Keyboard[] public keyboards;

    function getKeyboards() public view returns (_Keyboard[] memory) {
        return keyboards;
    }

    function create(
        KeyboardKind _kind,
        bool _isPBT,
        string calldata _filter
    ) external {
        _Keyboard memory newKeyboard = _Keyboard({
            kind: _kind,
            isPBT: _isPBT,
            filter: _filter,
            owner: msg.sender
        });

        keyboards.push(newKeyboard);
    }

    function tip(uint256 _index) external payable {
        address payable owner = payable(keyboards[_index].owner);
        owner.transfer(msg.value);
    }
}
