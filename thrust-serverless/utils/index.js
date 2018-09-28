const JString = Java.type('java.lang.String')
const Mac = Java.type('javax.crypto.Mac')
const SecretKeySpec = Java.type('javax.crypto.spec.SecretKeySpec')
const Base64 = Java.type('java.util.Base64')

function buildToken (message) {
  const sha256HMAC = Mac.getInstance('HmacSHA256')

  const secretKey = new SecretKeySpec(getBytes(env('serverless.secret')), 'HmacSHA256')
  sha256HMAC.init(secretKey)

  return Base64.getEncoder().encodeToString(sha256HMAC.doFinal(getBytes(message)))
}

function getBytes (str) {
  return new JString(str).getBytes('UTF-8')
}

exports = {
  buildToken: buildToken
}
