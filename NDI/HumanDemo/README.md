## 概要
- このアプリケーションは、iOSアプリ[『ZIG SIM PRO』](https://apps.apple.com/us/app/zig-sim-pro/id1481556614)と連携して使用します。
- 『ZIG SIM PRO』から送信した人物情報が付与されている画像をNDIで受信し、人物と背景を分けて加工するサンプルアプリケーションです。

<img src="https://github.com/1-10/zigsim-receivers/blob/main/art/zigsim_ndi_human.gif" width="600">

<img src="https://github.com/1-10/zigsim-receivers/blob/main/art/ndi_human_composition.png" width="600">

## 準備
[TouchDesigner](https://derivative.ca/)をインストールして起動できるようにしてください。

## 使用方法

### 『ZIG SIM PRO』

1. iOSデバイスを本アプリケーションを起動するPCと同じローカルネットワークに繋ぐ。
1. 『ZIG SIM PRO』のNDIの設定画面で以下のように設定する。
    - Scene Type: HUMAN
    - Human Image Type: BOTH1
1. 『ZIG SIM PRO』のSensor画面でNDIを選択する。
1. 『ZIG SIM PRO』のStart画面に遷移し、人体をカメラで収める。

### 本アプリケーション

1. ndi_human_demo.toeを開く。
1. 「NDI In」オペレータを選択して、Source Nameに「ZIGSIM PRO」を設定する。

<img src="https://github.com/1-10/zigsim-receivers/blob/main/art/touch_ndi_setting.png" width="600">