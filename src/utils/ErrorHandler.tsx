import {ALERT_TYPE} from 'react-native-alert-notification';
import { CustomToaster } from '../common/CustomToaster';


export const formErrorHandler = (data: any) => {
  const ers = Object.getOwnPropertyNames(data);
  if (ers?.length) {
    CustomToaster({type: ALERT_TYPE.DANGER, message: data});
  }
};

type ErrorType = {
  data: any;
  status: number;
  message: string;
  code: number;
};

type firebaseErrorCodesType = {
  [key: string]: string;
};

type httpErrorCodesType = {
  [key: number]: string;
};

export const firebaseErrorCodes: firebaseErrorCodesType = {
  'auth/too-many-requests': 'Too many requests. Please try again later',
  'auth/claims-too-large': 'Claims too large',
  'auth/email-already-exists': 'Email already exists',
  'auth/user-not-found':
    'Please check your entered Email Address. No such user found!',
  'auth/wrong-password': 'Incorrect password',
  'auth/email-already-in-use':
    'This email address is already in use by another account',
  'auth/insufficient-permission': 'Insufficient Permission',
  'auth/internal-error': 'auth/internal-error',
  'auth/invalid-argument': 'Invalid  Argument',
  'auth/invalid-claims': 'Invalid Claims',
  'auth/invalid-continue-uri': 'Invalid Continue Uri',
  'auth/invalid-creation-time': 'Invalid Creation Time',
  'auth/invalid-credential': 'Invalid Email/Password',
  'auth/invalid-disabled-field': 'Invalid Disabled Field',
  'auth/invalid-display-name': 'Invalid display Name',
  'auth/invalid-dynamic-link-domain': 'Invalid Dynamic Link Domain',
  'auth/invalid-email': 'Invalid email.',
  'auth/invalid-email-verified': 'Invalid Email Verified',
  'auth/invalid-hash-algorithm': 'Invalid Hash Algorithm',
  'auth/invalid-hash-block-size': 'Invalid Hash Block Size',
  'auth/invalid-hash-derived-key-length': 'Invalid Hash Derived Key Length',
  'auth/invalid-hash-key': 'Invalid Hash Key',
  'auth/invalid-hash-memory-cost': 'Invalid Hash Memory Cost',
  'auth/invalid-hash-parallelization': 'Invalid Hash Parallelization',
  'auth/invalid-hash-rounds': 'Invalid Hash Rounds',
  'auth/invalid-hash-salt-separator': 'Invalid Hash Salt Separator',
  'auth/invalid-id-token': 'Invalid ID Token',
  'auth/invalid-last-sign-in-time': 'Invalid Las Sign In Time',
  'auth/invalid-page-token': 'Invalid Page Token',
  'auth/invalid-password': 'Invalid Password',
  'auth/invalid-password-has': 'Invalid Password Has',
  'auth/invalid-password-salt': 'Invalid Password Salt',
  'auth/invalid-phone-number': 'Invalid Phone Number',
  'auth/invalid-photo-url': 'Invalid Photo Url',
  'auth/invalid-provider-data': 'Invalid Provider Data',
  'auth/invalid-provider-id': 'Invalid Provider Id',
  'auth/invalid-oauth-responsetype': 'Invalid Oauth Response type',
  'auth/invalid-session-cookie-duration': 'invalid Session Cookie Duration',
  'auth/invalid-uid': 'Invalid Uid',
  'auth/invalid-user-import': 'Invalid User Import',
  'auth/maximum-user-count-exceeded': 'Maximum User Count Exceeded',
  'auth/missing-android-pkg-name': 'Missing Android Package Name',
  'auth/missing-continue-uri': 'Missing Continue Uri',
  'auth/missing-hash-algorithm': 'Missing Hash Algorithm',
  'auth/missing-ios-bundle-id': 'Missing iOS Bundle',
  'auth/missing-uid': 'Missing UID',
  'auth/missing-oauth-client-secret': 'Missing OAuth Client Secret',
  'auth/operation-not-allowed': 'Operation Not Allowed',
  'auth/phone-number-already-exists': 'Phone Number Already Exists',
  'auth/project-not-found': 'Project Not Found',
  'auth/reserved-claims': 'Reserved Claims',
  'auth/session-cookie-expired': 'Session Cookie Expired',
  'auth/session-cookie-revoked': 'Session Cookie Revoked',
  'auth/uid-already-exists': 'Uid Already Exists',
  'auth/unauthorized-continue-uri': 'Unauthorized Continue',
  'auth/network-request-failed': "Look's like you are offline",
  'auth/developer-error':
    'There was a developer error. Please check your Firebase configuration and code.',
};

export const httpStatusCodes: httpErrorCodesType = {
  101: 'The server is changing protocols, Please try again later',
  100: 'Continue',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'Request processed, But server return no content.',
  205: 'The user should reset the document which sent this request',
  206: 'The server is delivering only part of the resource',
  300: 'The requested resource has multiple representations',
  301: 'The requested resource has been permanently moved to a new location',
  302: 'The requested resource has been temporarily moved to another location',
  303: 'Resource moved to another URI',
  304: 'No changes since the last request. No need to resend data',
  305: 'Unable to access the resource, Please try again later',
  307: 'The requested resource is temporarily moved to another location',
  400: 'Invalid request syntax or missing headers, Please try again later ',
  401: 'You are not Authorized',
  402: 'This code is reserved for future use',
  403: 'The server understood the request, but it refuses to authorize it',
  404: 'The server did not find the requested resource',
  405: 'Method not allowed for this resource',
  406: "Resource can't generate acceptable content",
  407: 'Authenticate with the proxy to proceed',
  408: 'Network Connection Timeout,Please try again later',
  409: "The request couldn't be completed due to a conflict",
  410: 'The requested resource is no longer available',
  411: 'The server refuses to accept the request without a defined Content-Length',
  412: 'Unable to proceed, Requested conditions are false',
  413: 'The server refused to process the request, Please try again later',
  414: 'The URL is longer than the server is willing to interpret',
  415: 'Unsupported Media Type',
  422: '422 error invalid data',
  416: 'Server cannot supply that data, Please try again later',
  417: 'The server cannot meet the requirements of the Expected request',
  426: 'Unable to proceed, Upgrade Required',
  428: 'The origin server requires the request to be conditional',
  429: 'Too Many Request, Please Try After Some Time',
  431: 'Request Header Fields Too Large',
  500: 'Internal Server Error, Please try again later',
  501: "The server doesn't support the functionality required to fulfill the request",
  502: 'Bad Gateway, Please try again later',
  503: 'Server is overloaded or undergoing maintenance',
  504: 'Gateway Connection Timeout, Please try again later',
  505: 'HTTP Version Not Supported',
};

export const ErrorHandler = (Error: ErrorType | any) => {
  if (Error?.data?.message && Error?.data?.message?.trim()?.length !== 0) {
    CustomToaster({type: ALERT_TYPE.DANGER, message: Error?.data.message});
  } else if (Error?.status && httpStatusCodes[Error.status]) {
    CustomToaster({
      type: ALERT_TYPE.DANGER,
      message: httpStatusCodes[Error.status],
    });
  } else if (Error?.code) {
    CustomToaster({
      type: ALERT_TYPE.DANGER,
      message: firebaseErrorCodes[Error.code] ?? 'something went wrong',
    });
  } else if (Error?.message && Error?.message?.trim()?.length !== 0) {
    CustomToaster({type: ALERT_TYPE.DANGER, message: Error?.message});
  } else {
    CustomToaster({type: ALERT_TYPE.DANGER, message: 'Something went wrong'});
  }
};
