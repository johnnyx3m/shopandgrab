import AppConfig from '../../config';
import Stripe from 'stripe';

const stripe = new Stripe(AppConfig.get('/stripe/config/secretkey'));

const CURRENCY = "usd";
const COUNTRY = "US";
const ACCOUNT_TYPE = "bank_account";

export default {
  createCustomer(payload) {
    console.log("STRIPELIB: createCustomer")
    const card = {
      card: {
        number: payload.creditCardNumber,
        exp_month: parseInt(payload.creditCardExpirationMonth),
        exp_year: parseInt(payload.creditCardExpirationYear),
        cvc: payload.creditCardCvv,
        name: payload.creditCardName
      }
    }

    return stripe.tokens.create(card)
    .then(result => {
      console.log("created card token...")
      const data = {
        email: payload.email,
        source: result.id,
        metadata: {
          first_name: payload.firstName,
          last_name: payload.lastName,
          phone_number: payload.phoneNumber,
          address1: payload.address1,
          address2: payload.address2,
          city: payload.city,
          state: payload.state
        }
      }
      return stripe.customers.create(data)
    })
  },

  updateCustomer(stripeId, data) {
    console.log("STRIPELIB: updateCustomer")
    return stripe.customers.update(stripeId, data);
  },

  createManagedAccount(data) {
    const bankAccount = {
      bank_account: {
        country: 'US',
        currency: 'usd',
        name: data.firstName+' '+data.lastName,
        account_holder_type: 'individual',
        routing_number: data.routingNumber,
        account_number: data.accountNumber
      }
    }

    console.log("STRIPELIB: createManagedAccount")
    return stripe.tokens.create(bankAccount)
    .then(token => {
      console.log("created bank_account token...")
      return stripe.accounts.create({
        managed: true,
        country: 'US',
        email: data.email,
        external_account: token.id,
        legal_entity:{
          type: 'individual',
          first_name: data.firstName,
          last_name: data.lastName,
          dob: {
            day: (data.birthdate).getDate(),
            month: ((data.birthdate).getMonth() + 1),
            year: (data.birthdate).getFullYear()
          },
          ssn_last_4 : data.ssnLast4
        },
        transfer_schedule: {
          interval: 'manual'
        }
      })
    })
  },

  deleteAccount(stripeId) {
      console.log('STRIPELIB: deleteAccount');
      return stripe.accounts.del(stripeId);
  },

  createCharge(data) {
    console.log('STRIPELIB: createCharge')
    return stripe.charges.create({
      amount: data.amount,
      currency: 'usd',
      customer: data.customer,
      description: data.description
    });
  },

  createTransfer(data) {
    console.log('STRIPELIB: createTransfer')
    return stripe.transfers.create({
      amount: data.amount,
      currency: 'usd',
      destination: data.stripeId,
      description: data.description
    });
  },

  deleteCustomer(data) {
    console.log('STRIPELIB: deleteCustomer');
    return stripe.customers.del(data.stripeId);
  },

  retrieveCustomer(data) {
    console.log('STRIPELIB: retrieveCustomer');
    return stripe.customers.retrieve(
      data.stripeId
    );
  },

  createCard(stripeId, data) {
    console.log('STRIPELIB: createCard');
    return stripe.customers.createSource(stripeId, data);
  },

  retrieveCard(data) {
    console.log('STRIPELIB: retrieveCard');
    return stripe.customers.retrieveCard(
      data.stripeId,
      data.cardId
    );
  },

  updateCard(data) {
    console.log('STRIPELIB: updateCard');
    return stripe.customers.updateCard(
      data.stripeId,
      data.cardId,
      data.metadata
    );
  },

  deleteCard(stripeId, cardId) {
    console.log('STRIPELIB: deleteCard');
    return stripe.customers.deleteCard(stripeId, cardId);
  },

  updateAccount(data) {
    let tosAcceptance;
    const transferSchedule = { interval: "manual" };

    if (typeof data.ipAddress !== 'undefined') {
      tosAcceptance = {
        date: parseInt(Date.now() / 1000),
        ip: data.ipAddress
      }
    }

    console.log('STRIPELIB: updateAccount');
    return stripe.accounts.update(
      data.stripeId,
      {
        email: data.email,
        external_account: {
          object: ACCOUNT_TYPE,
          account_number: data.accountNumber,
          country: COUNTRY,
          currency: CURRENCY,
          routing_number: data.routingNumber
        },
        legal_entity:{
          type: 'individual',
          first_name: data.firstName,
          last_name: data.lastName,
          dob: {
            day: (data.birthdate).getDate(),
            month: ((data.birthdate).getMonth() + 1),
            year: (data.birthdate).getFullYear()
          },
          ssn_last_4 : data.ssnLast4
        },
        tos_acceptance: tosAcceptance,
        transfer_schedule: transferSchedule
      }
    );
  },

  retrieveAccount(data) {
    console.log('STRIPELIB: retrieveAccount');
    return stripe.accounts.retrieve(data.stripeId, function(err, account) {

      return account;
    });
  },

  // Events
  retrieveEvent(data) {
    console.log('STRIPELIB: retrieveEvent');
    return stripe.events.retrieve(data.eventId,
       { stripe_account: data.stripeAccount });
  },

  // Balance
  retrieveBalance(data) {
    console.log('STRIPELIB: retrieveBalance');
    return stripe.balance.retrieve({
      stripe_account: data.stripeId
    });
  },

  // Transfer
  createTransferToBank(data) {
    console.log('STRIPELIB: createTransferToBank');
    return stripe.transfers.create({
      amount: data.amount,
      description: data.description,
      currency: CURRENCY,
      destination: "default_for_currency"
    }, { stripe_account: data.stripeAccount })
  },

  retrieveTransfer(data) {
    console.log('STRIPELIB: retrieveTransfer');
    return stripe.transfers.retrieve(data.transferId,
            { stripe_account: data.stripeAccount });
  },

}
