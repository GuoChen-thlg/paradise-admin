import Koa from 'koa'
import jsonwebtoken from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { closedInterval } from '../../../../utils'
import { ErrorCode } from '../../../../middlewares/BeautifyResponse'
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS, JWT_PRIVATEKEY } = process.env

export async function emailer(ctx: Koa.ParameterizedContext, next: Koa.Next) {
	const { email } = ctx.request.body
	const cookie_name = 'verification-code'
	if (email === undefined) {
		ctx.throw(ErrorCode.err34, 400)
	}
	if (email === '') {
		ctx.throw(ErrorCode.err32, 400)
	}
	if (ctx.cookies.get(cookie_name)) {
		ctx.throw(ErrorCode.err35, 400)
	}
	const transport = nodemailer.createTransport({
		service: EMAIL_SERVICE,
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASS,
		},
	})
	const verificationCode = closedInterval(100000, 999999)

	try {
		transport.sendMail({
			from: `超级管理员<${EMAIL_USER}>`,
			sender: EMAIL_USER,
			to: email,
			subject: `验证码`,
			html: `<head><base target="_blank" /> <style type="text/css">::-webkit-scrollbar{ display: none; }</style> <style id="cloudAttachStyle" type="text/css">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style> <style id="blockquoteStyle" type="text/css">blockquote{display:none;}</style> <style type="text/css"> body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px} td, input, button, select, body{font-family:Helvetica, 'Microsoft Yahei', verdana} pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%} th,td{font-family:arial,verdana,sans-serif;line-height:1.666} img{ border:0} header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block} blockquote{margin-right:0px} </style> </head> <body tabindex="0" role="listitem"> <table width="700" border="0" align="center" cellspacing="0" style="width:700px;"> <tbody> <tr> <td> <div style="width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;"> <table border="0" cellpadding="0" cellspacing="0" width="700" height="39" style="font:12px Tahoma, Arial, 宋体;"> <tbody><tr><td width="210"></td></tr></tbody> </table> </div> <div style="width:680px;padding:0 10px;margin:0 auto;"> <div style="line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;"> <strong style="display:block;margin-bottom:15px;">尊敬的用户：<span style="color:#f60;font-size: 16px;"></span>您好！</strong> <strong style="display:block;margin-bottom:15px;"> 请在验证码输入框中输入：<span style="color:#f60;font-size: 24px">${verificationCode}</span>，以完成操作。 </strong> </div> <div style="margin-bottom:30px;"> <small style="display:block;margin-bottom:20px;font-size:12px;"> <p style="color:#747474;"> 有效时长3分钟 </p> </small> </div> </div> <div style="width:700px;margin:0 auto;"> <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;"> <p>此为系统邮件，请勿回复<br> 请保管好您的邮箱，避免账号被他人盗用 </p> </div> </div> </td> </tr> </tbody></table></body>`,
		})
		const cookieVal = jsonwebtoken.sign(
			{
				email: email,
				code: verificationCode,
			},
			JWT_PRIVATEKEY,
			{
				expiresIn: `${60 * 3}s`,
			}
		)
		ctx.cookies.set(cookie_name, cookieVal, {
			path: '/',
			httpOnly: false,
			maxAge: 1e3 * 60 * 3,
			expires: new Date(new Date().getTime() + 1e3 * 60 * 3),
			signed: true,
			overwrite: true,
		})
		ctx.status = 200
		ctx.body = {}
	} catch (err) {
		console.log(err)
		
	}
}
