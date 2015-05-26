# CryptoJS 3.1

CryptoJS is a growing collection of standard and secure cryptographic algorithms implemented in JavaScript using best practices and patterns. They are fast, and they have a consistent and simple interface.

If you have a problem with CryptoJS, if you want to discuss new features, or if you want to contribute to the project, you can visit the CryptoJS discussion group.

See more: https://code.google.com/p/crypto-js/


# MD5

MD5 is a widely used hash function. It's been used in a variety of security applications and is also commonly used to check the integrity of files. Though, MD5 is not collision resistant, and it isn't suitable for applications like SSL certificates or digital signatures that rely on this property.

```javascript
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
<script>
    var hash = CryptoJS.MD5("Message");
</script>
```