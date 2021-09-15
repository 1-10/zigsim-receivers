## 概要
- 体を使ってクイズに解答するゲームです。
- このアプリケーションは、iOSアプリ[『ZIG SIM PRO』](https://apps.apple.com/us/app/zig-sim-pro/id1481556614)と連携して使用します。
- 『ZIG SIM PRO』のARKitのBodyを使用します。

<img src="https://github.com/1-10/zigsim-receivers/blob/main/art/body_choice_quize.gif" width="700">

## 準備
このリポジトリをクローンして実行できるようにしてください。

```
$ git clone https://github.com/1-10/zigsim-receivers.git
$ cd zigsim-receivers/ARkit/BodyTrackingDemo/
$ npm i
```

## 使用方法
### アプリケーションの起動

1. BodyTrackingDemoディレクトリ内で以下を実行してサーバーを起動する。

    ```
    $ node main.js
    ```

1. BodyChoiceQuizディレクトリに移動し、index.htmlをブラウザで開く。
    - CDNを使用しているのでインターネットに繋がった状態で開いてください。

### 『ZIG SIM PRO』で人体の関節位置情報を送信

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
1. 以下を参考にして、『ZIG SIM PRO』のStartボタンをタップする。
    - ARkit機能を起動した時の位置・方向を元にAR座標系の原点が決まります。
    
    <img src="https://docs-assets.developer.apple.com/published/07f7a569d7/9e32bddd-d69b-41f5-9aba-55183f358ff4.png" width="300">
    
1. 以下のような状態になるようiOS端末を配置する。
    
    <img src="https://github.com/1-10/zigsim-receivers/blob/main/art/body_choice_quiz_system.png" width="500">

## 設定値
### 位置関係
- [settings.js](https://github.com/1-10/zigsim-receivers/blob/main/ARkit/BodyChoiceQuiz/assets/settings.js)で位置関係を調整できます。
    - xWidth: x軸方向の領域の長さ[m]
    - zWidth: z軸方向の領域の長さ[m]
    - xWidthAdjustValue: AR座標系の原点と選択肢領域の中央線間のX軸方向の距離[m]
    - zWidthAdjustValue: AR座標系の原点と選択肢領域間の-Z軸方向の距離[m]

    <img src="https://github.com/1-10/zigsim-receivers/blob/main/art/body_choice_quiz_system_outline.png" width="500">
    
### クイズの内容
- [quizzes.js](https://github.com/1-10/zigsim-receivers/blob/main/ARkit/BodyChoiceQuiz/assets/quizzes.js)
    - question: 問題
    - choices: 4つの選択肢
    - correct: 正解領域の番号（0始まり）
