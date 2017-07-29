package com.mygdx.game.system;

import com.badlogic.ashley.core.EntitySystem;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

public class RenderSystem extends EntitySystem {
	SpriteBatch batch;
	Texture img;
	
	public RenderSystem() {
		batch = new SpriteBatch();
		img = new Texture("badlogic.jpg");
	}
 
	@Override
	public void update(float deltaTime) {
		Gdx.gl.glClearColor(1, 0, 0, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		batch.begin();
		batch.draw(img, 0, 0);
		batch.end();
	}
	
	public void dispose() {
		batch.dispose();
		img.dispose();
	}
}