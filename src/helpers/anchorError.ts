/**
 * Credits: @metaplex
 */
const LangErrorCode = {
  // Instructions.
  InstructionMissing: 100,
  InstructionFallbackNotFound: 101,
  InstructionDidNotDeserialize: 102,
  InstructionDidNotSerialize: 103,

  // IDL instructions.
  IdlInstructionStub: 1000,
  IdlInstructionInvalidProgram: 1001,

  // Constraints.
  ConstraintMut: 2000,
  ConstraintHasOne: 2001,
  ConstraintSigner: 2002,
  ConstraintRaw: 2003,
  ConstraintOwner: 2004,
  ConstraintRentExempt: 2005,
  ConstraintSeeds: 2006,
  ConstraintExecutable: 2007,
  ConstraintState: 2008,
  ConstraintAssociated: 2009,
  ConstraintAssociatedInit: 2010,
  ConstraintClose: 2011,
  ConstraintAddress: 2012,
  ConstraintZero: 2013,
  ConstraintTokenMint: 2014,
  ConstraintTokenOwner: 2015,
  ConstraintMintMintAuthority: 2016,
  ConstraintMintFreezeAuthority: 2017,
  ConstraintMintDecimals: 2018,
  ConstraintSpace: 2019,

  // Accounts.
  AccountDiscriminatorAlreadySet: 3000,
  AccountDiscriminatorNotFound: 3001,
  AccountDiscriminatorMismatch: 3002,
  AccountDidNotDeserialize: 3003,
  AccountDidNotSerialize: 3004,
  AccountNotEnoughKeys: 3005,
  AccountNotMutable: 3006,
  AccountOwnedByWrongProgram: 3007,
  InvalidProgramId: 3008,
  InvalidProgramExecutable: 3009,
  AccountNotSigner: 3010,
  AccountNotSystemOwned: 3011,
  AccountNotInitialized: 3012,
  AccountNotProgramData: 3013,
  AccountNotAssociatedTokenAccount: 3014,
  // State.
  StateInvalidAddress: 4000,

  // Used for APIs that shouldn't be used anymore.
  Deprecated: 5000,
};

export const SystemErrorMessage = new Map([
  [1, 'Insufficient balance.'],
  [2, 'Invalid instruction data.'],
  [3, 'Invalid account data'],
  [4, 'Account data too small'],
  [5, 'Insufficient funds'],
  [6, 'Incorrect prgoram id'],
  [7, 'Missing required signature'],
  [8, 'Account already initialized'],
  [9, 'Attempt to operate on an account that was not yet initialized'],
  [10, 'Not enough account keys provided'],
  [11, 'Account borrow failed, already borrowed'],
  [12, 'Max seed length exceeded'],
  [13, 'Invalid seeds'],
  [14, 'Borsh IO Error'],
  [15, 'Account not rent exempt'],
]);

const LangErrorMessage = new Map([
  // Instructions.
  [LangErrorCode.InstructionMissing, '8 byte instruction identifier not provided'],
  [LangErrorCode.InstructionFallbackNotFound, 'Fallback functions are not supported'],
  [
    LangErrorCode.InstructionDidNotDeserialize,
    'The program could not deserialize the given instruction',
  ],
  [
    LangErrorCode.InstructionDidNotSerialize,
    'The program could not serialize the given instruction',
  ],

  // Idl instructions.
  [LangErrorCode.IdlInstructionStub, 'The program was compiled without idl instructions'],
  [
    LangErrorCode.IdlInstructionInvalidProgram,
    'The transaction was given an invalid program for the IDL instruction',
  ],

  // Constraints.
  [LangErrorCode.ConstraintMut, 'A mut constraint was violated'],
  [LangErrorCode.ConstraintHasOne, 'A has_one constraint was violated'],
  [LangErrorCode.ConstraintSigner, 'A signer constraint was violated'],
  [LangErrorCode.ConstraintRaw, 'A raw constraint was violated'],
  [LangErrorCode.ConstraintOwner, 'An owner constraint was violated'],
  [LangErrorCode.ConstraintRentExempt, 'A rent exempt constraint was violated'],
  [LangErrorCode.ConstraintSeeds, 'A seeds constraint was violated'],
  [LangErrorCode.ConstraintExecutable, 'An executable constraint was violated'],
  [LangErrorCode.ConstraintState, 'A state constraint was violated'],
  [LangErrorCode.ConstraintAssociated, 'An associated constraint was violated'],
  [LangErrorCode.ConstraintAssociatedInit, 'An associated init constraint was violated'],
  [LangErrorCode.ConstraintClose, 'A close constraint was violated'],
  [LangErrorCode.ConstraintAddress, 'An address constraint was violated'],
  [LangErrorCode.ConstraintZero, 'Expected zero account discriminant'],
  [LangErrorCode.ConstraintTokenMint, 'A token mint constraint was violated'],
  [LangErrorCode.ConstraintTokenOwner, 'A token owner constraint was violated'],
  [LangErrorCode.ConstraintMintMintAuthority, 'A mint mint authority constraint was violated'],
  [LangErrorCode.ConstraintMintFreezeAuthority, 'A mint freeze authority constraint was violated'],
  [LangErrorCode.ConstraintMintDecimals, 'A mint decimals constraint was violated'],
  [LangErrorCode.ConstraintSpace, 'A space constraint was violated'],

  // Accounts.
  [
    LangErrorCode.AccountDiscriminatorAlreadySet,
    'The account discriminator was already set on this account',
  ],
  [LangErrorCode.AccountDiscriminatorNotFound, 'No 8 byte discriminator was found on the account'],
  [
    LangErrorCode.AccountDiscriminatorMismatch,
    '8 byte discriminator did not match what was expected',
  ],
  [LangErrorCode.AccountDidNotDeserialize, 'Failed to deserialize the account'],
  [LangErrorCode.AccountDidNotSerialize, 'Failed to serialize the account'],
  [LangErrorCode.AccountNotEnoughKeys, 'Not enough account keys given to the instruction'],
  [LangErrorCode.AccountNotMutable, 'The given account is not mutable'],
  [
    LangErrorCode.AccountOwnedByWrongProgram,
    'The given account is owned by a different program than expected',
  ],
  [LangErrorCode.InvalidProgramId, 'Program ID was not as expected'],
  [LangErrorCode.InvalidProgramExecutable, 'Program account is not executable'],
  [LangErrorCode.AccountNotSigner, 'The given account did not sign'],
  [LangErrorCode.AccountNotSystemOwned, 'The given account is not owned by the system program'],
  [
    LangErrorCode.AccountNotInitialized,
    'The program expected this account to be already initialized',
  ],
  [LangErrorCode.AccountNotProgramData, 'The given account is not a program data account'],
  [
    LangErrorCode.AccountNotAssociatedTokenAccount,
    'The given account is not the associated token account',
  ],

  // State.
  [LangErrorCode.StateInvalidAddress, 'The given state account does not have the correct address'],

  // Misc.
  [LangErrorCode.Deprecated, 'The API being used is deprecated and should no longer be used'],
]);

// An error from a user defined program.
export class ProgramError {
  constructor(readonly code: number, readonly msg: string, ...params: any[]) {}

  public static parse(err: any, idlErrors: Map<number, string>): ProgramError | null {
    let errorCode: number | null = null;
    if (err.InstructionError) {
      if (err.InstructionError[0] && typeof err.InstructionError[0] == 'number') {
        errorCode = err.InstructionError[0];
      }
      if (err.InstructionError[1]?.Custom) {
        errorCode = err.InstructionError[1].Custom;
      }
    }

    if (errorCode == null) {
      // TODO: don't rely on the error string. web3.js should preserve the error
      //       code information instead of giving us an untyped string.
      let components = err.toString().split('custom program error: ');
      if (errorCode == null && components.length !== 2) {
        return null;
      }

      try {
        errorCode = parseInt(components[1]);
      } catch (parseErr) {
        return null;
      }
    }

    let errorMsg =
      (err.InstructionErr && err.InstructionErr[1]) ||
      idlErrors.get(errorCode) ||
      LangErrorMessage.get(errorCode) ||
      SystemErrorMessage.get(errorCode);
    if (errorMsg !== undefined) {
      return new ProgramError(errorCode, errorMsg, errorCode + ': ' + errorMsg);
    }

    // Unable to parse the error. Just return the untranslated error.
    return null;
  }

  public toString(): string {
    return this.msg;
  }
}
