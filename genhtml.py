#!/usr/bin/env python
# -*- coding: utf-8 -*-

from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader('.', encoding='utf-8'))
tpl = env.get_template('champler.tpl')
param = {}

#### HTMLを生成するための設定項目 ####
# サイト名
param['sitename'] = 'ExampleNet'
# ベースURL
param['baseurl'] = 'http://www.example.com/champler'
# パンくずリスト
param['breadcrumb'] = '<a href="#">Top</a> <i class="icon-angle-right"></i> <a href="./chample">Champler!</a>'
# Googleアナリティクス
param['ga'] = 'UA-XXXXXXXX-X'
################################

print(tpl.render(param=param))
