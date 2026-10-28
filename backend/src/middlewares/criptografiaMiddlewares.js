import crypto from 'node:crypto';

// Criptografia reversível (AES-256-GCM) para dados que precisam ser lidos de volta,
// como a senha do GOV do cliente. A chave vem de ENCRYPTION_KEY no .env.
const chave = () => {
    if (!process.env.ENCRYPTION_KEY) {
        throw new Error('ENCRYPTION_KEY não configurada no .env');
    }
    return crypto.createHash('sha256').update(process.env.ENCRYPTION_KEY).digest();
};

export function criptografar(texto) {
    const iv = crypto.randomBytes(12);
    const cifra = crypto.createCipheriv('aes-256-gcm', chave(), iv);
    const criptografado = Buffer.concat([cifra.update(texto, 'utf8'), cifra.final()]);
    const tag = cifra.getAuthTag();
    return [iv, tag, criptografado].map((parte) => parte.toString('base64')).join(':');
}

export function descriptografar(valor) {
    const [iv, tag, criptografado] = valor.split(':').map((parte) => Buffer.from(parte, 'base64'));
    const decifra = crypto.createDecipheriv('aes-256-gcm', chave(), iv);
    decifra.setAuthTag(tag);
    return Buffer.concat([decifra.update(criptografado), decifra.final()]).toString('utf8');
}