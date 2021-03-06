//doRenderingAnnot.js 20210130
//http://force4u.cocolog-nifty.com/
/*
Public Domain
href="http://creativecommons.org/publicdomain/zero/1.0/
自由に改変再配布等行ってください。
*/

/*
署名メニュー
拡張メニュー（アドオン）にコマンドメニューを追加します
前提事項
プリフライトに『注釈とフォームフィールドの統合』がある事が前提
無い場合はエラーになります。
また
getProfileByName("注釈とフォームフィールドの統合");
を変更すれば任意のプリフライトを実行する事ができます。
*/
/*
Adobe ReaderDC　Adobe Acrobat DC　用
（下位バージョンでは動作確認していないだけですが）
インストール先は以下
▼アプリケーションドメイン
/Applications/Adobe Acrobat Reader DC.app/Contents/Resources/JavaScripts
/Applications/Adobe Acrobat DC/Adobe Acrobat.app/Contents/Resources/JavaScripts

▼ローカルドメイン
/Library/Application Support/Adobe/Acrobat/DC/JavaScripts

▼ユーザードメイン
/Users/ユーザー名/Library/Application Support/Adobe/Acrobat/DC/JavaScripts

▼WINDOWSはリーダーとDCが別
C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader\Javascripts
C:\Program Files (x86)\Adobe\Acrobat DC\Acrobat\Javascripts
*/


//署名メニューに出す宣言
menuParent = "SignMenu";
//リーダーでは動作しないのでメニュー分岐
if(app.viewerType == "Reader") {
//リーダーの場合はメニューを実行出来なくする
app.addMenuItem({
cName: "Reader",
cUser:"▼注釈とフォームの統合(Readerでは動作しません)",
cParent: "SignMenu",
cExec: "",
cEnable: "event.rc = (false);"
});
} else {
//アクロバット製品版の場合はメニューを出す
app.addMenuItem({
	cName:"RenderingAnnot",
	cUser:"▼注釈とフォームの統合",
	cParent:menuParent,
	cExec: "doRenderingAnnot()",
	nPos:30
	});

}
//実行部

function doRenderingAnnot(){
try {
//この部分を変えると他のプロファイルも実行できます
var oProfile = Preflight.getProfileByName("注釈とフォームフィールドの統合");
if( oProfile != undefined) {
//ここでプロファイル実行
var myPreflightResult = this.preflight( oProfile );
}
//エラーしたらコンソール出す
}catch(e) {
var strErrMes = "注釈とフォームを統合に失敗しました";
console.show();
console.println(strErrMes);
}
}
//メニュー本体
app.addToolButton({
	cName: "▼注釈とフォームを統合",
	cParent: "SignMenu",
	cExec: "doRenderingAnnot()",
	cEnable: "event.rc = true",
	cMarked: "event.rc = false",
	cTooltext: "注釈とフォームを統合",
	nPos: -7,
	cLabel: "▼注釈とフォームを統合"
	});
	