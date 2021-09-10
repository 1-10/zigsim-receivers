# BodyTrackingDemo
## 概要
- このアプリケーションは、iOSアプリ[『ZIG SIM PRO』](https://apps.apple.com/us/app/zig-sim-pro/id1481556614)のARkit機能のTracking TypeがBODYの時に使用できます。
- 『ZIG SIM PRO』で取得した人体（１名のみ）の90箇所の関節位置とiOSデバイスの現在位置をUDPで受信し、ブラウザ上に表示します。間接位置は緑色、iOSデバイス位置は赤色です。

## 準備
このリポジトリをクローンして実行できるようにしてください。

```
$ git clone https://github.com/1-10/zigsim-receivers.git
$ cd zigsim-receivers/ARkit/BodyTrackingDemo/
$ npm i
```

## 使用方法
### 本アプリケーションの起動

1. BodyTrackingDemoディレクトリ内で以下を実行する。

    ```
    $ node main.js
    ```

1. BodyTrackingDemoディレクトリ内のindex.htmlをブラウザで開く。

### 『ZIG SIM PRO』から人体とデバイスの位置情報を送信

1. 本アプリケーションが起動しているPCのローカルIPアドレスを取得する。
1. 『ZIG SIM PRO』のSetting画面で各設定値を以下のように変更する。
    - Data Destination: OTHER APP
    - Protocol: UDP
    - IP Address: 1.で取得したIPアドレス
    - Port Number: 10000
    - Message Format: JSON
1. 『ZIG SIM PRO』のARKitの設定画面で以下のように設定する。
    - Tracking Type: BODY
    - Feature Points: OFF
1. 『ZIG SIM PRO』のSensor画面でARKitを選択する。
1. 『ZIG SIM PRO』のStart画面に遷移し、人体全体をカメラで収める。